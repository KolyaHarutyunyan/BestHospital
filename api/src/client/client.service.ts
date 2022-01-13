import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDTO, UpdateClientDto } from './dto';
import { MongooseUtil } from '../util';
import { Model } from 'mongoose';
import { ClientModel } from './client.model';
import { ClientSanitizer } from './interceptor';
import { IClient } from './interface';
import { HistoryService, serviceLog } from '../history';
import { ClientDTO } from './dto';
import { CreateTerminationDto } from '../termination/dto/create-termination.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly sanitizer: ClientSanitizer,
    private readonly historyService: HistoryService,
  ) {
    this.model = ClientModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IClient>;
  private mongooseUtil: MongooseUtil;

  /** Create a new client */
  create = async (dto: CreateClientDTO, userId: string): Promise<ClientDTO> => {
    try {
      const client = new this.model({
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        code: dto.code,
        ethnicity: dto.ethnicity,
        language: dto.language,
        familyLanguage: dto.familyLanguage,
        gender: dto.gender,
        status: dto.status,
        birthday: dto.birthday,
      });
      await client.save();
      await this.historyService.create({
        resource: client._id,
        onModel: 'Client',
        title: serviceLog.createClient,
        user: userId,
      });
      return this.sanitizer.sanitize(client);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  };

  /** returns all clients */
  async findAll(skip: number, limit: number, status: string): Promise<any> {
    try {
      if (!status) {
        status = 'ACTIVE';
      }
      const [clients, count] = await Promise.all([
        this.model
          .find({ status })
          .populate({ path: 'enrollment', select: 'name' })
          .sort({ _id: 1 })
          .skip(skip)
          .limit(limit),
        this.model.countDocuments({ status }),
      ]);
      const sanClient = this.sanitizer.sanitizeMany(clients);
      return { clients: sanClient, count };
    } catch (e) {
      throw e;
    }
  }

  /** Get Client By Id */
  async findById(_id: string): Promise<ClientDTO> {
    const client = await this.model
      .findById({ _id })
      .populate({ path: 'enrollment', select: 'name' });
    this.checkClient(client);
    return this.sanitizer.sanitize(client);
  }

  /** Update the Client */
  async update(_id: string, dto: UpdateClientDto, userId: string): Promise<ClientDTO> {
    try {
      const client = await this.model.findOne({ _id });
      this.checkClient(client);
      if (dto.firstName) client.firstName = dto.firstName;
      if (dto.middleName) client.middleName = dto.middleName;
      if (dto.lastName) client.lastName = dto.lastName;
      if (dto.code) client.code = dto.code;
      if (dto.ethnicity) client.ethnicity = dto.ethnicity;
      if (dto.language) client.language = dto.language;
      if (dto.familyLanguage) client.familyLanguage = dto.familyLanguage;
      if (dto.gender) client.gender = dto.gender;
      if (dto.birthday) {
        client.birthday = dto.birthday;
      }

      await client.save();
      await this.historyService.create({
        resource: client._id,
        onModel: 'Client',
        title: serviceLog.updateClient,
        user: userId,
      });
      return this.sanitizer.sanitize(client);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  }

  /** Delete the Client */
  async remove(_id: string): Promise<string> {
    const client = await this.model.findById({ _id });
    this.checkClient(client);
    await client.remove();
    return client._id;
  }

  /** Set Status of a Funder Inactive*/
  setStatus = async (
    _id: string,
    status: string,
    dto: CreateTerminationDto,
  ): Promise<ClientDTO> => {
    const client = await this.model.findById({ _id });
    this.checkClient(client);
    if (status != 'ACTIVE' && !dto.date) {
      throw new HttpException(
        'If status is not active, then date is required field',
        HttpStatus.BAD_REQUEST,
      );
    }
    client.termination.date = dto.date;
    client.status = status;
    if (dto.reason) {
      client.termination.reason = dto.reason;
    }
    await client.save();
    return this.sanitizer.sanitize(client);
  };

  /** Private methods */
  /** if the date is not valid, throws an exception */
  private checkTime(date: Date) {
    if (isNaN(date.getTime())) {
      throw new HttpException('Date with this format was not found', HttpStatus.NOT_FOUND);
    }
  }
  /** if the client is not found, throws an exception */
  private checkClient(client: IClient) {
    if (!client) {
      throw new HttpException('Client with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}

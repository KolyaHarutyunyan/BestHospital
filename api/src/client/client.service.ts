import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDTO, UpdateClientDto } from './dto';
import { MongooseUtil } from '../util';
import { Model } from 'mongoose';
import { ClientModel } from './client.model';
import { ClientSanitizer } from './interceptor';
import { IClient, IClientCount } from './interface';
import { HistoryService, serviceLog } from '../history';
import { ClientDTO } from './dto';
import { CreateTerminationDto } from '../termination/dto/create-termination.dto';
import { ClientStatus } from './client.constants';

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
  create = async (dto: CreateClientDTO): Promise<ClientDTO> => {
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
      await Promise.all([
        client.save(),
        this.historyService.create({
          resource: client._id,
          onModel: 'Client',
          title: serviceLog.createClient,
          user: dto.user.id,
        }),
      ]);
      return this.sanitizer.sanitize(client);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  };

  /** returns all clients */
  async findAll(skip: number, limit: number, status: string): Promise<IClientCount> {
    try {
      const [clients, count] = await Promise.all([
        this.model
          .find({ status: status ? status : ClientStatus.ACTIVE })
          .populate({ path: 'enrollment', select: 'name' })
          .sort({ _id: 1 })
          .skip(skip)
          .limit(limit),
        this.model.countDocuments({ status: status ? status : ClientStatus.ACTIVE }),
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
      if (dto.birthday) client.birthday = dto.birthday;
      await Promise.all([
        client.save(),
        this.historyService.create({
          resource: client._id,
          onModel: 'Client',
          title: serviceLog.updateClient,
          user: userId,
        }),
      ]);
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
  /** activate the client */
  async active(_id: string): Promise<ClientDTO> {
    const client = await this.model.findById({ _id });
    this.checkClient(client);
    client.termination.date ? (client.termination.date = undefined) : undefined;
    client.termination.reason ? (client.termination.reason = undefined) : undefined;
    client.status = ClientStatus.ACTIVE;
    await client.save();
    return this.sanitizer.sanitize(client);
  }
  /** inActivate the client */
  async inActive(_id: string): Promise<ClientDTO> {
    const client = await this.model.findById({ _id });
    this.checkClient(client);
    client.termination.date ? (client.termination.date = undefined) : undefined;
    client.termination.reason ? (client.termination.reason = undefined) : undefined;
    client.status = ClientStatus.INACTIVE;
    await client.save();
    return this.sanitizer.sanitize(client);
  }
  /** hold the client */
  async hold(_id: string, dto: CreateTerminationDto): Promise<ClientDTO> {
    if (!dto.date) {
      throw new HttpException(
        'If status is hold, then date is required field',
        HttpStatus.BAD_REQUEST,
      );
    }
    const client = await this.model.findById({ _id });
    this.checkClient(client);
    client.termination.reason = dto.reason;
    client.termination.date = dto.date;
    client.status = ClientStatus.HOLD;
    await client.save();
    return this.sanitizer.sanitize(client);
  }
  /** terminate the client */
  async terminate(_id: string, dto: CreateTerminationDto): Promise<ClientDTO> {
    if (!dto.date) {
      throw new HttpException(
        'If status is hold, then date is required field',
        HttpStatus.BAD_REQUEST,
      );
    }
    const client = await this.model.findById({ _id });
    this.checkClient(client);
    client.termination.date = dto.date;
    client.termination.reason = dto.reason;
    client.status = ClientStatus.TERMINATE;
    await client.save();
    return this.sanitizer.sanitize(client);
  }
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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDTO, UpdateClientDto } from './dto';
import { MongooseUtil } from '../util';
import { Model, Types } from 'mongoose';
import { ClientModel } from './client.model';
import { FundingService } from '../funding';
import { ServiceService } from '../service';
import { ClientSanitizer } from './interceptor';
import { IClient } from './interface';
import { HistoryService, serviceLog } from '../history';
import {
  ClientDTO,
} from './dto';

@Injectable()
export class ClientService {
  constructor(
    // private readonly addressService: AddressService,
    private readonly sanitizer: ClientSanitizer,
    private readonly historyService: HistoryService,
    private readonly fundingService: FundingService,
    private readonly service: ServiceService,
  ) {
    this.model = ClientModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IClient>;

  private mongooseUtil: MongooseUtil;

  /** Create a new client */
  create = async (dto: CreateClientDTO): Promise<ClientDTO> => {
    try {
      let client = new this.model({
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        code: dto.code,
        ethnicity: dto.ethnicity,
        language: dto.language,
        familyLanguage: dto.familyLanguage,
        gender: dto.gender,
        age: dto.age,
        status: dto.status,
        birthday: dto.birthday
        // address: await this.addressService.getAddress(dto.address),
      });

      await client.save();
      await this.historyService.create({ resource: client._id, onModel: "Client", title: serviceLog.createClient })

      return this.sanitizer.sanitize(client);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  };
  /** returns all clients */
  async findAll(): Promise<ClientDTO[]> {
    try {
      const clients = await this.model
        .find({})
        .populate({ path: 'enrollment', select: 'name' });
      this.checkClient(clients[0]);
      return this.sanitizer.sanitizeMany(clients);
    } catch (e) {
      throw e;
    }
  }
  /** Get Client By Id */
  async findById(_id: string): Promise<ClientDTO> {
    const client = await this.model.findById({ _id }).populate({ path: 'enrollment', select: "name" });
    this.checkClient(client);
    return this.sanitizer.sanitize(client);
  }

  /** Update the Client */
  async update(_id: string, dto: UpdateClientDto): Promise<ClientDTO> {
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
      if (dto.age) client.age = dto.age;

      if (dto.birthday) {
        client.birthday = dto.birthday
      }
      if (dto.status) client.status = dto.status;
      // if (dto.address)
      //   funder.address = await this.addressService.getAddress(dto.address);
      await client.save();
      await this.historyService.create({ resource: client._id, onModel: "Client", title: serviceLog.updateClient })
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

    await client.remove()
    return client._id;
  }

  /** Private methods */
  /** if the date is not valid, throws an exception */
  private checkTime(date: Date) {
    if (isNaN(date.getTime())) {
      throw new HttpException(
        'Date with this format was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** if the client is not found, throws an exception */
  private checkClient(client: IClient) {
    if (!client) {
      throw new HttpException(
        'Client with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

}

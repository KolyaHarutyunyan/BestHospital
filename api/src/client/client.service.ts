import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDTO, UpdateClientDto } from './dto';
import { MongooseUtil } from '../util';
import { Model, Types } from 'mongoose';
import { ClientModel } from './client.model';
import { ClientContactModel } from './clientContact.model';
import { ClientAuthorizationServiceModel } from './clientAuthorizationService.model'
import { FundingService } from '../funding';
import { ServiceService } from '../service';

import { IAuthorizationService } from './interface';

import { ClientSanitizer, ContactSanitizer } from './interceptor';
import { IClient, IContact } from './interface';
import {
  ClientDTO, CreateContactDTO, ContactDTO, 
  UpdateContactDto
} from './dto';

@Injectable()
export class ClientService {
  constructor(
    // private readonly addressService: AddressService,
    private readonly sanitizer: ClientSanitizer,
    private readonly contactSanitizer: ContactSanitizer,

    private readonly fundingService: FundingService,
    private readonly service: ServiceService,
  ) {
    this.model = ClientModel;
    this.contactModel = ClientContactModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IClient>;
  private contactModel: Model<IContact>;

  private mongooseUtil: MongooseUtil;

  /** Create a new client */
  create = async (dto: CreateClientDTO): Promise<ClientDTO> => {
    try {
      let birthday = new Date(dto.birthday);
      this.checkTime(birthday);

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
        // birthday: dto.birthday
        // address: await this.addressService.getAddress(dto.address),
      });
      client.birthday = birthday.toLocaleDateString();
      await client.save();
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
  async findOne(_id: string): Promise<ClientDTO> {
    const client = await this.model.findOne({ _id }).populate({ path: 'enrollment', select: "name" });
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
        let birthday = new Date(dto.birthday);
        this.checkTime(birthday);
        client.birthday = dto.birthday.toLocaleDateString();
      }
      if (dto.status) client.status = dto.status;
      // if (dto.address)
      //   funder.address = await this.addressService.getAddress(dto.address);
      await client.save();
      return this.sanitizer.sanitize(client);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  }

  /** Delete the Client */
  async remove(_id: string): Promise<string> {
    const client = await this.model.findByIdAndDelete({ _id });
    this.checkClient(client);
    return client._id;
  }

  /** Create a new contact */
  createContact = async (
    dto: CreateContactDTO,
    clientId: string,
  ): Promise<ContactDTO> => {
    try {
      const client = await this.model.findById({ _id: clientId });
      this.checkClient(client);
      let contact = new this.contactModel({
        clientId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        relationship: dto.relationship,
        phoneNumber: dto.phoneNumber,
        // address: await this.addressService.getAddress(dto.address),
      });
      await contact.save();
      return this.contactSanitizer.sanitize(contact);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Contact already exists');
      throw e;
    }
  };

  /** returns all contact */
  async findAllContacts(clientId: string): Promise<ContactDTO[]> {
    try {
      const contacts = await this.contactModel.find({ clientId });
      this.checkContact(contacts[0]);
      return this.contactSanitizer.sanitizeMany(contacts);
    } catch (e) {
      throw e;
    }
  }
  /** Get Contact By Id */
  async findContact(_id: string): Promise<ContactDTO> {
    const contact = await this.contactModel.findOne({ _id });
    this.checkContact(contact);
    return this.contactSanitizer.sanitize(contact);
  }

  /** Update the Contact */
  async updateContact(_id: string, dto: UpdateContactDto): Promise<ContactDTO> {
    try {
      const contact = await this.contactModel.findOne({ _id });
      this.checkContact(contact);
      if (dto.firstName) contact.firstName = dto.firstName;
      if (dto.lastName) contact.lastName = dto.lastName;
      if (dto.relationship) contact.relationship = dto.relationship;
      if (dto.phoneNumber) contact.phoneNumber = dto.phoneNumber;
      // if (dto.address)
      //   funder.address = await this.addressService.getAddress(dto.address);
      await contact.save();
      return this.contactSanitizer.sanitize(contact);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Contact already exists');
      throw e;
    }
  }

  /** Delete the Contact */
  async removeContact(_id: string): Promise<string> {
    const contact = await this.contactModel.findByIdAndDelete({ _id });
    this.checkContact(contact);
    return contact._id;
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
        'Profile with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** if the contact is not found, throws an exception */
  private checkContact(contact: IContact) {
    if (!contact) {
      throw new HttpException(
        'Profile with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

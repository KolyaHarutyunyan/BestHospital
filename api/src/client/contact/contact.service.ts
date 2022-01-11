import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../../util';
import { IContact } from './interface';
import { CreateContactDTO, UpdateContactDTO, ContactDTO } from './dto';
import { ClientContactModel } from './contact.model';
import { ContactSanitizer } from './interceptor';
import { ClientModel } from '../client.model';
import { IClient } from '../interface';
import { AddressService } from '../../address';

@Injectable()
export class ContactService {
  constructor(
    private readonly sanitizer: ContactSanitizer,
    private readonly addressService: AddressService,
  ) {
    this.model = ClientContactModel;
    this.clientModel = ClientModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IContact>;
  private clientModel: Model<IClient>;
  private mongooseUtil: MongooseUtil;

  /** Create a new contact */
  create = async (dto: CreateContactDTO, clientId: string): Promise<ContactDTO> => {
    try {
      const client = await this.clientModel.findById({ _id: clientId });
      this.checkClient(client);
      let contact = new this.model({
        clientId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        relationship: dto.relationship,
        phoneNumber: dto.phoneNumber,
        address: await this.addressService.getAddress(dto.address),
      });
      await contact.save();
      return this.sanitizer.sanitize(contact);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Contact already exists');
      throw e;
    }
  };

  /** returns all contact */
  async findAllContacts(clientId: string): Promise<ContactDTO[]> {
    try {
      const contacts = await this.model.find({ clientId });
      return this.sanitizer.sanitizeMany(contacts);
    } catch (e) {
      throw e;
    }
  }

  /** Get Contact By Id */
  async findContact(_id: string): Promise<ContactDTO> {
    const contact = await this.model.findOne({ _id });
    this.checkContact(contact);
    return this.sanitizer.sanitize(contact);
  }

  /** Update the Contact */
  async updateContact(_id: string, dto: UpdateContactDTO): Promise<ContactDTO> {
    try {
      const contact = await this.model.findOne({ _id });
      this.checkContact(contact);
      if (dto.firstName) contact.firstName = dto.firstName;
      if (dto.lastName) contact.lastName = dto.lastName;
      if (dto.relationship) contact.relationship = dto.relationship;
      if (dto.phoneNumber) contact.phoneNumber = dto.phoneNumber;
      if (dto.address) contact.address = await this.addressService.getAddress(dto.address);
      await contact.save();
      return this.sanitizer.sanitize(contact);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Contact already exists');
      throw e;
    }
  }

  /** Delete the Contact */
  async removeContact(_id: string): Promise<string> {
    const contact = await this.model.findByIdAndDelete({ _id });
    this.checkContact(contact);
    return contact._id;
  }

  /** Private methods */
  /** if the contact is not found, throws an exception */
  private checkContact(contact: IContact) {
    if (!contact) {
      throw new HttpException('Client contact with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
  /** if the client is not found, throws an exception */
  private checkClient(client: IClient) {
    if (!client) {
      throw new HttpException('Profile with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}

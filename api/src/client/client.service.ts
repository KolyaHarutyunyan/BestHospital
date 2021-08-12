import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDTO, UpdateClientDto } from './dto';
import { MongooseUtil } from '../util';
import { Model, Types } from 'mongoose';
import { ClientModel } from './client.model';
import { ClientAuthorizationModel } from './clientAuthorization.model';
import { ClientContactModel } from './clientContact.model';
import { ClientEnrollmentModel } from './clientEnrollment.model';
import { ClientAuthorizationServiceModel } from './clientAuthorizationService.model';
import { FundingService } from '../funding';
import { ServiceService } from '../service';

import { IAuthorization, IAuthorizationService } from './interface';

import {
  ClientSanitizer,
  ContactSanitizer,
  EnrollmentSanitizer,
  AuthorizationSanitizer,
  AuthorizationServiceSanitizer,
} from './interceptor';
import { IClient, IContact, IEnrollment } from './interface';
import {
  ClientDTO,
  CreateContactDTO,
  ContactDTO,
  CreateEnrollmentDTO,
  EnrollmentDTO,
  UpdateEnrollmentDto,
  UpdateContactDto,
  AuthorizationDTO,
  CreateAuthorizationDTO,
  CreateAuthorizationServiceDTO,
  AuthorizationServiceDTO,
} from './dto';

@Injectable()
export class ClientService {
  constructor(
    // private readonly addressService: AddressService,
    private readonly sanitizer: ClientSanitizer,
    private readonly contactSanitizer: ContactSanitizer,
    private readonly enrollmentSanitizer: EnrollmentSanitizer,
    private readonly authorizationSanitizer: AuthorizationSanitizer,
    private readonly authorizationServiceSanitizer: AuthorizationServiceSanitizer,

    private readonly fundingService: FundingService,
    private readonly service: ServiceService,
  ) {
    this.model = ClientModel;
    this.contactModel = ClientContactModel;
    this.enrollmentModel = ClientEnrollmentModel;
    this.clientAuthorizationModel = ClientAuthorizationModel;
    this.clientAuthorizationServiceModel = ClientAuthorizationServiceModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IClient>;
  private contactModel: Model<IContact>;
  private enrollmentModel: Model<IEnrollment>;
  private clientAuthorizationModel: Model<IAuthorization>;
  private clientAuthorizationServiceModel: Model<IAuthorizationService>;

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
    const client = await this.model
      .findOne({ _id })
      .populate({ path: 'enrollment', select: 'name' });
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

  /** Create a new enrollment */
  createEnrollment = async (
    dto: CreateEnrollmentDTO,
    clientId: string,
    funderId: string,
  ): Promise<EnrollmentDTO> => {
    try {
      let startDate = new Date(dto.startDate);
      this.checkTime(startDate);
      let terminationDate = new Date(dto.terminationDate);
      this.checkTime(terminationDate);
      const client = await this.model.findById({ _id: clientId });
      this.checkClient(client);
      const funder = await this.fundingService.findOne(funderId);

      if (dto.primary) {
        const findEnrollment = await this.enrollmentModel.findOne({
          clientId,
          primary: true,
        });

        if (findEnrollment !== null) {
          findEnrollment.primary = false;
          await findEnrollment.save();
        }
      }

      let enrollment = new this.enrollmentModel({
        clientId,
        primary: dto.primary,
        // startDate: dto.startDate,
      });
      enrollment.startDate = startDate.toLocaleDateString();
      enrollment.terminationDate = terminationDate.toLocaleDateString();
      enrollment.fundingSource = funder.name;

      await enrollment.save();

      if (enrollment.primary) {
        client.enrollment = funderId;
        await client.save();
      }
      return this.enrollmentSanitizer.sanitize(enrollment);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Enrollment already exists');
      throw e;
    }
  };

  /** returns all enrollment */
  async findAllEnrollment(clientId: string): Promise<any> {
    try {
      const enrollments = await this.enrollmentModel.find({ clientId });
      this.checkEnrollment(enrollments[0]);
      return this.enrollmentSanitizer.sanitizeMany(enrollments);
    } catch (e) {
      throw e;
    }
  }
  /** Update the Enrollment */
  async updateEnrollment(
    _id: string,
    enrollmentId: string,
    funderId: string,
    dto: UpdateEnrollmentDto,
  ): Promise<EnrollmentDTO> {
    try {
      const enrollment: any = await this.enrollmentModel.findOne({
        _id: enrollmentId,
      });
      this.checkEnrollment(enrollment);
      if (dto.startDate) {
        let startDate = new Date(dto.startDate);
        this.checkTime(startDate);
        enrollment.startDate = dto.startDate.toLocaleDateString();
      }
      if (dto.terminationDate) {
        let terminationDate = new Date(dto.terminationDate);
        this.checkTime(terminationDate);
        enrollment.terminationDate = dto.terminationDate.toLocaleDateString();
      }

      const client = await this.model.findById({ _id });
      this.checkClient(client);
      if (dto.primary) {
        const findEnrollment = await this.enrollmentModel.findOne({
          clientId: _id,
          primary: true,
        });
        if (findEnrollment !== null) {
          findEnrollment.primary = false;
          await findEnrollment.save();
        }
      }
      enrollment.primary = dto.primary;
      await enrollment.save();

      if (enrollment.primary) {
        client.enrollment = funderId;
        await client.save();
      }

      return this.enrollmentSanitizer.sanitize(enrollment);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  }

  /** Delete the Client */
  async removeEnrollment(_id: string): Promise<string> {
    const enrollment = await this.enrollmentModel.findById({ _id });
    this.checkEnrollment(enrollment);
    if (enrollment.primary) {
      const client = await this.model.findById({ _id: enrollment.clientId });
      this.checkClient(client);
      client.enrollment = '';
      await enrollment.remove();
      await client.save();
    }
    return enrollment._id;
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

  /** Create a new authorization */
  createAuthorization = async (
    _id: string,
    funderId: string,
    dto: CreateAuthorizationDTO,
  ): Promise<AuthorizationDTO> => {
    try {
      let startDate = new Date(dto.startDate);
      this.checkTime(startDate);
      let endDate = new Date(dto.endDate);
      this.checkTime(endDate);

      const client = await this.model.findOne({ _id });
      this.checkClient(client);

      const funder = await this.fundingService.findOne(funderId);

      let authorization = new this.clientAuthorizationModel({
        authorizationId: dto.authorizationId,
        clientId: client._id,
        fundingSource: funder.name,
        // address: await this.addressService.getAddress(dto.address),
      });
      authorization.startDate = startDate.toLocaleDateString();
      authorization.endDate = endDate.toLocaleDateString();

      await authorization.save();
      return this.authorizationSanitizer.sanitize(authorization);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  };
  /** Create a new authorization service */
  createAuthorizationService = async (
    _id: string,
    fundingServiceId: string,
    dto: CreateAuthorizationServiceDTO,
  ): Promise<AuthorizationServiceDTO> => {
    try {
      const modifiers = [];
      const client = await this.model.findOne({ _id });
      this.checkClient(client);
      const fundingService = await this.fundingService.findOneService(
        fundingServiceId,
      );
      if (fundingService.modifiers.length != []) {
        fundingService.modifiers.map((modifier) =>
          modifiers.push(modifier.name),
        );
      }
      let authorizationService = new this.clientAuthorizationServiceModel({
        total: dto.total,
        completed: dto.completed,
        available: dto.available,
        clientId: client._id,
        service: fundingService.name,
        modifiers,
        // address: await this.addressService.getAddress(dto.address),
      });
      await authorizationService.save();
      return this.authorizationServiceSanitizer.sanitize(authorizationService);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(
        e,
        'Authorization Service already exists',
      );
      throw e;
    }
  };

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
  /** Private methods */
  /** if the client is not found, throws an exception */
  private checkClient(client: IClient) {
    if (!client) {
      throw new HttpException(
        'Profile with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** Private methods */
  /** if the enrollment is not found, throws an exception */
  private checkEnrollment(enrollment: IEnrollment) {
    if (!enrollment) {
      throw new HttpException(
        'Profile with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** Private methods */
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

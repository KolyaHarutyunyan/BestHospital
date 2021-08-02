import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDTO, UpdateClientDto } from './dto';
import { MongooseUtil } from '../util';
import { Model, Types } from 'mongoose';
import { ClientModel } from './client.model';
import { ClientContactModel } from './clientContact.model';
import { ClientEnrollmentModel } from './clientEnrollment.model';
import { FundingService } from '../funding';

import { ClientSanitizer, ContactSanitizer, EnrollmentSanitizer } from './interceptor';
import { IClient, IContact, IEnrollment } from './interface';
import { ClientDTO, CreateContactDTO, ContactDTO, CreateEnrollmentDTO, EnrollmentDTO, UpdateEnrollmentDto } from './dto';

@Injectable()
export class ClientService {
  constructor(
    // private readonly addressService: AddressService,
    private readonly sanitizer: ClientSanitizer,
    private readonly contactSanitizer: ContactSanitizer,
    private readonly enrollmentSanitizer: EnrollmentSanitizer,
    private readonly fundingService: FundingService

  ) {
    this.model = ClientModel;
    this.contactModel = ClientContactModel;
    this.enrollmentModel = ClientEnrollmentModel;

    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IClient>;
  private contactModel: Model<IContact>;
  private enrollmentModel: Model<IEnrollment>;

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
      client.birthday = birthday.toLocaleDateString()
      await client.save();
      return this.sanitizer.sanitize(client);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  }
  /** returns all clients */
  async findAll(): Promise<ClientDTO[]> {
    try {
      const clients = await this.model.find({}).populate({ path: 'enrollments', match: { primary: "true" }, select: "fundingSource" })
      this.checkClient(clients[0]);
      return this.sanitizer.sanitizeMany(clients);
    } catch (e) {
      throw e;
    }
  }
  /** Get Client By Id */
  async findOne(_id: string): Promise<ClientDTO> {
    const client = await this.model.findOne({ _id }).populate({ path: 'enrollments', match: { primary: "true" }, select: "fundingSource" });
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
        client.birthday = dto.birthday.toLocaleDateString()
      };
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
    const client = await this.model.findByIdAndDelete({ _id }).deleteOne();
    this.checkClient(client);
    return client._id;
  }

  /** Create a new enrollment */
  createEnrollment = async (dto: CreateEnrollmentDTO, clientId: string, funderId: string): Promise<EnrollmentDTO> => {
    try {
      let startDate = new Date(dto.startDate);
      this.checkTime(startDate);
      let terminationDate = new Date(dto.terminationDate);
      this.checkTime(terminationDate);

      const client: any = await this.model.findById({ _id: clientId }).populate('enrollments');
      this.checkClient(client);
      const funder = await this.fundingService.findOne(funderId);

      if (dto.primary && client.enrollments.length != []) {
        const res = client.enrollments.find(enrollment => enrollment.primary == true)
        if (res != undefined) {
          const enrollment = await this.enrollmentModel.findOne({ _id: res._id });
          enrollment.primary = false;
          await enrollment.save()
        }
      }

      let enrollment = new this.enrollmentModel({
        primary: dto.primary,
        // startDate: dto.startDate,
      });

      enrollment.startDate = startDate.toLocaleDateString()
      enrollment.terminationDate = terminationDate.toLocaleDateString()
      enrollment.fundingSource = funder.name;

      await enrollment.save();
      client.enrollments.push(enrollment._id);

      await client.save()
      return this.enrollmentSanitizer.sanitize(enrollment);

    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Enrollment already exists');
      throw e;
    }
  }

  /** returns all enrollment */
  async findAllEnrollment(clientId: string): Promise<any> {
    try {
      const client = await this.model.findById({ _id: clientId }).populate('enrollments');
      this.checkClient(client);
      return client
      // return this.sanitizer.sanitizeMany(client);
    } catch (e) {
      throw e;
    }
  }
  /** Update the Enrollment */
  async updateEnrollment(_id: string, enrollmentId: string, dto: UpdateEnrollmentDto): Promise<EnrollmentDTO> {
    try {
      const enrollment: any = await this.enrollmentModel.findOne({ _id: enrollmentId });
      this.checkEnrollment(enrollment);
      if (dto.startDate) {
        let startDate = new Date(dto.startDate);
        this.checkTime(startDate);
        enrollment.startDate = dto.startDate.toLocaleDateString()
      };
      if (dto.terminationDate) {
        let terminationDate = new Date(dto.terminationDate);
        this.checkTime(terminationDate);
        enrollment.terminationDate = dto.terminationDate.toLocaleDateString()
      };
      if (dto.fundingSource) {
        const funder = await this.fundingService.findByName(dto.fundingSource);
        enrollment.fundingSource = funder.name
      }
      if (dto.primary) {
        const client: any = await this.model.findOne({ _id }).populate({ path: 'enrollments', match: { primary: "true" } });
        this.checkClient(client);
        if (client.enrollments.length != []) {
          const enrollment = await this.enrollmentModel.findOne({ _id: client.enrollments[0]._id });
          if(client.enrollments[0]._id != enrollmentId){
            enrollment.primary = false;
            await enrollment.save();
          }
        }
      }

      enrollment.primary = dto.primary;
      await enrollment.save()
      return this.enrollmentSanitizer.sanitize(enrollment);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Client already exists');
      throw e;
    }
  }

  /** Create a new contact */
  createContact = async (dto: CreateContactDTO, clientId: string): Promise<ContactDTO> => {
    try {
      const client = await this.model.findById({ _id: clientId });
      this.checkClient(client);
      let contact = new this.contactModel({
        firstName: dto.firstName,
        lastName: dto.lastName,
        relationship: dto.relationship,
        phoneNumber: dto.phoneNumber,
        // address: await this.addressService.getAddress(dto.address),
      });
      await contact.save();
      client.contacts.push(contact._id);
      await client.save()
      return this.contactSanitizer.sanitize(contact);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Contact already exists');
      throw e;
    }
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
}

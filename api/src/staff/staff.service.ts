import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ObjectID } from "mongodb";
import { Model, Types } from 'mongoose';
import { StaffDTO, CreateStaffDto, EditStaffDTO, CreateStaffCredentialDto, StaffCredentialDTO, EditStaffCredentialDTO } from './dto';
import { StaffSanitizer } from './interceptor';
import { IStaff, IStaffCredential } from './interface';
import { StaffModel } from './staff.model';
import { AuthNService } from '../authN';
import { CredentialService } from '../credential';
import { MongooseUtil } from '../util';
import { AddressService } from '../address';
import { StaffCredentialModel } from './staffCredential.model';
import { CreateCredentialDto } from '../credential';
import { isValidObjectId } from '../util';

@Injectable()
export class StaffService {
  constructor(
    private readonly addressService: AddressService,
    private readonly authnService: AuthNService,
    private readonly credentialService: CredentialService,
    private readonly sanitizer: StaffSanitizer,
  ) {
    this.model = StaffModel;
    this.staffCredentailModel = StaffCredentialModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IStaff>;
  private staffCredentailModel: Model<IStaffCredential>;
  private mongooseUtil: MongooseUtil;

  /** Create a new user */
  create = async (dto: CreateStaffDto): Promise<StaffDTO> => {
    try {
      const _id = Types.ObjectId();

      let user = new this.model({
        _id,
        email: dto.email,
        secondaryEmail: dto.secondaryEmail,
        firstName: dto.firstName,
        lastName: dto.lastName,
        middleName: dto.middleName,
        phone: dto.phone,
        secondaryPhone: dto.secondaryPhone,
        state: dto.state,
        gender: dto.gender,
        birthday: dto.birthday,
        residency: dto.residency,
        ssn: dto.ssn,
        status: dto.status,
        address: await this.addressService.getAddress(dto.address),
      });
      user = (
        await Promise.all([
          user.save(),
          this.authnService.create(user._id, user.email),
        ])
      )[0];
      return this.sanitizer.sanitize(user);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'User already exists');
      throw e;
    }
  };

  /** Create a new staff credential */
  createStaffCredential = async (dto: CreateStaffCredentialDto): Promise<StaffCredentialDTO> => {
    try {
      const staff = await this.model.findById({ _id: dto.staffId });
      this.checkStaff(staff);
      const credential = await this.credentialService.findOne(dto.credentialId);
      let staffCredential = new this.staffCredentailModel({
        _id: dto.staffId,
        credentialId: dto.credentialId,
        expirationDate: dto.expirationDate
      });

      await staffCredential.save();
      return staffCredential;
      // return this.sanitizer.sanitize(user);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'staff credential already exists');
      throw e;
    }
  };

  /** Create a new credential */
  createCredential = async (dto: CreateCredentialDto): Promise<any> => {
    await this.credentialService.create(dto);
  };

  /** Edit a Staff */
  edit = async (id: string, dto: EditStaffDTO): Promise<StaffDTO> => {
    try {
      const admin = await this.model.findOne({ _id: id });
      this.checkStaff(admin);
      if (dto.email) {
        admin.email = dto.email;
        await this.authnService.changeEmail(id, dto.email);
      }
      if (dto.phone) admin.phone = dto.phone;
      if (dto.secondaryPhone) admin.secondaryPhone = dto.secondaryPhone;
      if (dto.firstName) admin.firstName = dto.firstName;
      if (dto.lastName) admin.lastName = dto.lastName;
      if (dto.state) admin.state = dto.state;
      if (dto.gender) admin.gender = dto.gender;
      if (dto.birthday) admin.birthday = dto.birthday;
      if (dto.residency) admin.residency = dto.residency;
      if (dto.ssn) admin.ssn = dto.ssn;
      if (dto.middleName) admin.middleName = dto.middleName;
      if (dto.email) admin.email = dto.email;
      if (dto.status) admin.status = dto.status;
      if (dto.secondaryEmail) admin.secondaryEmail = dto.secondaryEmail;
      if (dto.address)
        admin.address = await this.addressService.getAddress(dto.address);
      await admin.save()
      return this.sanitizer.sanitize(admin);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'Staff already exists');
      throw e;
    }
  };

  /** Similar to findById function but this is intended for returning response to the client (sanitized) */
  getProfile = async (id: string): Promise<StaffDTO> => {
    const admin = await this.model.findById(id);
    this.checkStaff(admin);
    return this.sanitizer.sanitize(admin);
  };

  /* Find the user and return it using the authId. This is for internal use only. */
  findById = async (_id: string): Promise<IStaff> => {
    try {
      const staff = await this.model.findById({ _id });
      this.checkStaff(staff)
      return staff;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  /** Find the user using the email */
  findByEmail = async (email: string): Promise<StaffDTO> => {
    const user = await this.model.findOne({ email: email });
    this.checkStaff(user);
    return this.sanitizer.sanitize(user);
  };

  /** returns all users */
  getUsers = async (status: number): Promise<any> => {
    if (status == 0) {
      const admins = await this.model.find({ status: 0 });
      this.checkStaff(admins[0])
      return this.sanitizer.sanitizeMany(admins);
    }
    const admins = await this.model.find({status: 1});
    this.checkStaff(admins[0])
    return this.sanitizer.sanitizeMany(admins);
  };

  // find the credentials
  async findCredential(_id: string): Promise<StaffCredentialDTO> {
    try {
      const staffCredentials = await this.staffCredentailModel.findById({ _id }).populate('credentialId');
      this.checkStaffCredential(staffCredentials)
      return staffCredentials;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // edit the credentials
  async editCredential(_id: string, dto: EditStaffCredentialDTO): Promise<StaffCredentialDTO> {
    try {
      const staffCredential = await this.staffCredentailModel.findById({ _id });
      this.checkStaffCredential(staffCredential);
      if (dto.expirationDate) {
        staffCredential.expirationDate = dto.expirationDate;
      }
      if (dto.credentialId) {
        const globCredential = await this.credentialService.findOne(dto.credentialId);
        staffCredential.credentialId = dto.credentialId;
      }
      await staffCredential.save()
      return staffCredential;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // delete the credentials
  async deleteCredential(_id: string): Promise<string> {
    try {
      const staffCredential = await this.staffCredentailModel.findByIdAndDelete({ _id });
      this.checkStaffCredential(staffCredential);
      return staffCredential._id;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /** Private methods */
  /** if the admin is not found, throws an exception */
  private checkStaff(staff: IStaff) {
    if (!staff) {
      throw new HttpException(
        'Staff with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** Private methods */
  /** if the credential is not valid, throws an exception */
  private checkStaffCredential(credential: IStaffCredential) {
    if (!credential) {
      throw new HttpException(
        'Staff Credential with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

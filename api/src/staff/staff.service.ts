import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ObjectID } from "mongodb";
import { Model, Types } from 'mongoose';
import { StaffDTO, CreateStaffDto, EditStaffDTO, CreateStaffCredentialDto, StaffCredentialDTO } from './dto';
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
import { v4 as uuidv4, v4 } from 'uuid';

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
        ssn: dto.ssn
        // address: await this.addressService.getAddress(dto.address),
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
      isValidObjectId(dto.userId)
      isValidObjectId(dto.credentialId)
      const staff = await this.model.findById({ _id: dto.userId });
      this.checkStaff(staff);
      const credential = await this.credentialService.findOne(dto.credentialId);
      let staffCredential = new this.staffCredentailModel({
        _id: dto.userId,
        credentialId: dto.credentialId
      });
      if (dto.expirationDate) {
        const expirationDate = new Date(dto.expirationDate);
        this.checkTime(expirationDate);
        staffCredential.expirationDate = expirationDate.toLocaleDateString()
      }
      await staffCredential.save();
      return staffCredential;
      // return this.sanitizer.sanitize(user);
    } catch (e) {
      throw e;
    }
  };

  /** Create a new credential */
  createCredential = async (dto: CreateCredentialDto): Promise<any> => {
    await this.credentialService.create(dto);
  };

  /** Edit a new user */
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
      if (dto.secondaryEmail) admin.secondaryEmail = dto.secondaryEmail;
      // if (dto.address)
      //   admin.address = await this.addressService.getAddress(dto.address);
      return this.sanitizer.sanitize(admin);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'User already exists');
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
      const staff = this.model.findById({ _id });
      this.checkStaff(await staff)
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
  getUsers = async (): Promise<StaffDTO[]> => {
    const admins = await this.model.find();
    return this.sanitizer.sanitizeMany(admins);
  };

  /** Private methods */
  /** if the admin is not found, throws an exception */
  private checkStaff(admin: IStaff) {
    if (!admin) {
      throw new HttpException(
        'Profile with this id was not found',
        HttpStatus.NOT_FOUND,
      );
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
}
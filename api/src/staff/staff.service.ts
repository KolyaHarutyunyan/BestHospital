import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { StaffDTO, CreateStaffDto, EditStaffDTO } from './dto';
import { StaffSanitizer } from './interceptor';
import { IStaff } from './interface';
import { StaffModel } from './staff.model';
import { AuthNService } from '../authN';
import { MongooseUtil } from '../util';
import { AddressService } from '../address';

@Injectable()
export class StaffService {
  constructor(
    private readonly addressService: AddressService,
    private readonly authnService: AuthNService,
    private readonly sanitizer: StaffSanitizer,
  ) {
    this.model = StaffModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IStaff>;
  private mongooseUtil: MongooseUtil;

  /** Create a new user */
  create = async (dto: CreateStaffDto): Promise<StaffDTO> => {
    try {
      let user = new this.model({
        firstEmail: dto.firstEmail,
        secondEmail: dto.secondEmail,
        firstName: dto.firstName,
        lastName: dto.lastName,
        middleName: dto.middleName,
        firstNumber: dto.firstNumber,
        secondNumber: dto.secondNumber,
        driveLicenze: dto.driveLicenze,
        state: dto.state,
        gender: dto.gender,
        birthday: dto.birthday,
        residency: dto.residency,
        ssn: dto.ssn,
        address: await this.addressService.getAddress(dto.address),
      });
      user = (
        await Promise.all([
          user.save(),
          this.authnService.create(user._id, user.firstEmail),
        ])
      )[0];
      return this.sanitizer.sanitize(user);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'User already exists');
      throw e;
    }
  };

  edit = async (id: string, dto: EditStaffDTO): Promise<StaffDTO> => {
    try {
      const admin = await this.model.findOne({ _id: id });
      this.checkStaff(admin);
      if (dto.firstEmail) {
        admin.firstEmail = dto.firstEmail;
        await this.authnService.changeEmail(id, dto.firstEmail);
      }
      if (dto.firstNumber) admin.firstNumber = dto.firstNumber;
      if (dto.secondNumber) admin.secondNumber = dto.secondNumber;
      if (dto.firstName) admin.firstName = dto.firstName;
      if (dto.lastName) admin.lastName = dto.lastName;
      if (dto.driveLicenze) admin.driveLicenze = dto.driveLicenze;
      if (dto.state) admin.state = dto.state;
      if (dto.gender) admin.gender = dto.gender;
      if (dto.birthday) admin.birthday = dto.birthday;
      if (dto.residency) admin.residency = dto.residency;
      if (dto.ssn) admin.ssn = dto.ssn;
      if (dto.middleName) admin.middleName = dto.middleName;
      if (dto.firstEmail) admin.firstEmail = dto.firstEmail;
      if (dto.secondEmail) admin.secondEmail = dto.secondEmail;
      if (dto.address)
        admin.address = await this.addressService.getAddress(dto.address);
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
  findById = async (id: string): Promise<IStaff> => {
    return this.model.findOne({ _id: id });
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
}

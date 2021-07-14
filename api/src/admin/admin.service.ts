import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AdminDTO, CreateAdminDTO, EditAdminDTO } from './dto';
import { AdminSanitizer } from './interceptor';
import { IAdmin } from './interface';
import { AdminModel } from './admin.model';
import { AuthNService } from '../authN';
import { MongooseUtil } from '../util';
import { AddressService } from '../address';

@Injectable()
export class AdminService {
  constructor(
    private readonly addressService: AddressService,
    private readonly authnService: AuthNService,
    private readonly sanitizer: AdminSanitizer,
  ) {
    this.model = AdminModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IAdmin>;
  private mongooseUtil: MongooseUtil;

  /** Create a new user */
  create = async (dto: CreateAdminDTO): Promise<AdminDTO> => {
    try {
      let user = new this.model({
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        username: dto.username,
        phoneNumber: dto.phoneNumber,
        ssn: dto.ssn,
        dl: dto.dl,
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
      this.mongooseUtil.checkDuplicateKey(e, 'User already exists');
      throw e;
    }
  };

  edit = async (id: string, dto: EditAdminDTO): Promise<AdminDTO> => {
    try {
      const admin = await this.model.findOne({ _id: id });
      this.checkAdmin(admin);
      if (dto.email) {
        admin.email = dto.email;
        await this.authnService.changeEmail(id, dto.email);
      }
      if (dto.phoneNumber) admin.phoneNumber = dto.phoneNumber;
      if (dto.firstName) admin.firstName = dto.firstName;
      if (dto.lastName) admin.lastName = dto.lastName;
      if (dto.username) admin.username = dto.username;
      if (dto.ssn) admin.ssn = dto.ssn;
      if (dto.dl) admin.dl = dto.dl;
      if (dto.address)
        admin.address = await this.addressService.getAddress(dto.address);
      return this.sanitizer.sanitize(admin);
    } catch (e) {
      this.mongooseUtil.checkDuplicateKey(e, 'User already exists');
      throw e;
    }
  };

  /** Similar to findById function but this is intended for returning response to the client (sanitized) */
  getProfile = async (id: string): Promise<AdminDTO> => {
    const admin = await this.model.findById(id);
    this.checkAdmin(admin);
    return this.sanitizer.sanitize(admin);
  };

  /* Find the user and return it using the authId. This is for internal use only. */
  findById = async (id: string): Promise<IAdmin> => {
    return this.model.findOne({ _id: id });
  };

  /** Find the user using the email */
  findByEmail = async (email: string): Promise<AdminDTO> => {
    const user = await this.model.findOne({ email: email });
    this.checkAdmin(user);
    return this.sanitizer.sanitize(user);
  };

  /** returns all users */
  getUsers = async (): Promise<AdminDTO[]> => {
    const admins = await this.model.find();
    return this.sanitizer.sanitizeMany(admins);
  };

  /** Private methods */
  /** if the admin is not found, throws an exception */
  private checkAdmin(admin: IAdmin) {
    if (!admin) {
      throw new HttpException(
        'Profile with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

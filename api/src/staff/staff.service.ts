import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { StaffDTO, CreateStaffDto, EditStaffDTO, StaffQueryDTO } from './dto';
import { StaffSanitizer } from './interceptor';
import { IStaff } from './interface';
import { StaffModel } from './staff.model';
import { AuthNService, UserType } from '../authN';
import { MongooseUtil } from '../util';
import { AddressService } from '../address';
import { CreateCredentialDto } from '../credential';
import { HistoryService, serviceLog } from '../history';
import { StaffStatus } from '../staff/staff.constants';
import { CreateTerminationDto } from '../termination/dto/create-termination.dto';
import { CreateStaffDtoTest } from './dto/createTest.dto';
import { ServiceService } from '../service'

@Injectable()
export class StaffService {
  constructor(
    private readonly addressService: AddressService,
    private readonly globalService: ServiceService,
    private readonly authnService: AuthNService,
    private readonly historyService: HistoryService,
    // private readonly credentialService: CredentialService,
    private readonly sanitizer: StaffSanitizer,
  ) {
    this.model = StaffModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IStaff>;
  private mongooseUtil: MongooseUtil;

  /** Create a new user */
  create = async (dto: CreateStaffDto, userId: string): Promise<StaffDTO> => {
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
        license: dto.license ? dto.license : {},
        address: await this.addressService.getAddress(dto.address),
      });
      user = (await Promise.all([user.save(), this.authnService.create(user._id, user.email, UserType.ADMIN)]))[0];

      await this.historyService.create({
        resource: user._id,
        onModel: 'Staff',
        title: serviceLog.createStaff,
        user: userId
      });
      return this.sanitizer.sanitize(user);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'User already exists');
      throw e;
    }
  };

  /** add a new service */
  addService = async (_id: string, serviceId: string): Promise<StaffDTO> => {
    try {
      let staff = await this.model.findById({ _id });
      this.checkStaff(staff);
      const service = await this.globalService.findOne(serviceId);
      if (staff.service.indexOf(service.id) != -1) {
        console.log(staff.service.indexOf(service.id))
        throw new HttpException('Service already exist', HttpStatus.BAD_REQUEST)
      }
      staff.service.push(service.id)
      staff = await (await staff.save()).populate('service').execPopulate();

      return this.sanitizer.sanitize(staff);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Staff Service already exists');
      throw e;
    }
  };

  /** delete a service */
  deleteService = async (_id: string, serviceId: string): Promise<string> => {
    try {
      console.log(_id);
      console.log(serviceId);
      let staff = await this.model.updateOne({ _id }, { $pull: { service: serviceId } });
      console.log(staff);
      if (staff.nModified) {
        return serviceId;
      }
      throw new HttpException('service was not found', HttpStatus.NOT_FOUND);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Staff Service already exists');
      throw e;
    }
  };

  /** get service */
  getService = async (_id: string): Promise<StaffDTO> => {
    try {
      let staff = await this.model.findById({ _id }).populate('service');
      this.checkStaff(staff);
      return this.sanitizer.sanitize(staff);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Staff Service already exists');
      throw e;
    }
  };

  /** Edit a Staff */
  edit = async (id: string, dto: EditStaffDTO, userId: string): Promise<StaffDTO> => {
    try {
      const admin: any = await this.model.findOne({ _id: id });
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
      if (dto.license) { admin.license = dto.license }
      if (dto.address) admin.address = await this.addressService.getAddress(dto.address);
      await admin.save();
      await this.historyService.create({
        resource: admin._id,
        onModel: 'Staff',
        title: serviceLog.updateStaff,
        user: userId
      });
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
      this.checkStaff(staff);
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
  getUsers = async (skip: number, limit: number, status: string): Promise<any> => {
    if (!status) {
      status = "ACTIVE"
    }
    const [staff, count] = await Promise.all([
      this.model.find({ status }).sort({ _id: -1 }).skip(skip).limit(limit),
      this.model.countDocuments({ status }),
    ]);
    const sanFun = this.sanitizer.sanitizeMany(staff);
    return { staff: sanFun, count };
  };

  /** Set Status of a staff Inactive*/
  setStatus = async (
    _id: string,
    status: any,
    dto: CreateTerminationDto,
  ): Promise<StaffDTO> => {
    const staff = await this.model.findById({ _id });
    this.checkStaff(staff);
    if (status != "ACTIVE" && !dto.date) {
      throw new HttpException('If status is not active, then date is required field', HttpStatus.BAD_REQUEST);
    }
    staff.termination.date = dto.date;
    if (dto.reason) {
      staff.termination.reason = dto.reason;
    }
    staff.status = status;

    await staff.save();
    return this.sanitizer.sanitize(staff);
  };

  /** Set Status of a staff Active */
  // setStatusActive = async (id: string, status: number): Promise<StaffDTO> => {
  //   const staff = await this.model.findOneAndUpdate(
  //     { _id: id },
  //     { $set: { status: status, termination: null } },
  //     { new: true },
  //   );
  //   this.checkStaff(staff);
  //   return this.sanitizer.sanitize(staff);
  // };
  /** Set isClinical of a staff Active */
  isClinical = async (id: string, status: boolean): Promise<StaffDTO> => {
    const staff = await this.model.findOneAndUpdate(
      { _id: id },
      { $set: { clinical: status } },
      { new: true },
    );
    this.checkStaff(staff);
    return this.sanitizer.sanitize(staff);
  };

  /** Private methods */
  /** if the admin is not found, throws an exception */
  private checkStaff(staff: IStaff) {
    if (!staff) {
      throw new HttpException('Staff with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}

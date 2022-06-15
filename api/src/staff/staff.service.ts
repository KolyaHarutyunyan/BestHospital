import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AddressService } from '../address';
import { AuthNService, UserType } from '../authN';
import { HistoryService, serviceLog } from '../history';
import { HistoryStatus } from '../history/history.constants';
import { ServiceService } from '../service';
import { MongooseUtil } from '../util';
import { CreateStaffDto, EditStaffDTO, StaffDTO } from './dto';
import { StaffSanitizer } from './interceptor';
import { ILicense, IStaff } from './interface';
import { StaffStatus } from './staff.constants';
import { StaffModel } from './staff.model';

@Injectable()
export class StaffService {
  constructor(
    private readonly addressService: AddressService,
    private readonly globalService: ServiceService,
    private readonly authnService: AuthNService,
    private readonly historyService: HistoryService,
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
      // check if email is unique
      this.checkLicense(dto.license);
      let user = new this.model({
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        state: dto.state,
        gender: dto.gender,
        birthday: dto.birthday,
        residency: dto.residency,
        ssn: dto.ssn,
        license: dto.license ? dto.license : {},
        middleName: dto.middleName,
        secondaryEmail: dto.secondaryEmail,
        secondaryPhone: dto.secondaryPhone,
        address: await this.addressService.getAddress(dto.address),
      });
      user = (
        await Promise.all([
          user.save(),
          this.authnService.create(user._id, user.email, UserType.ADMIN),
          this.historyService.create({
            resource: user._id,
            onModel: HistoryStatus.STAFF,
            title: serviceLog.createStaff,
            user: user._id,
          }),
        ])
      )[0];
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
      let [staff, service] = await Promise.all([
        this.model.findById({ _id, clinical: true }),
        this.globalService.findOne(serviceId),
      ]);
      this.checkStaff(staff);
      if (staff.service.indexOf(service.id) != -1) {
        throw new HttpException('Service already exist', HttpStatus.BAD_REQUEST);
      }
      staff.service.push(service.id);
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
      const staff = await this.model.updateOne({ _id }, { $pull: { service: serviceId } });
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
      const staff = await this.model.findById({ _id }).populate('service');
      this.checkStaff(staff);
      return this.sanitizer.sanitize(staff);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Staff Service already exists');
      throw e;
    }
  };

  /** Edit a Staff */
  edit = async (id: string, dto: EditStaffDTO): Promise<StaffDTO> => {
    try {
      let staff = await this.model.findOne({ _id: id });
      this.checkStaff(staff);
      if (dto.email) {
        staff.email = dto.email;
        await this.authnService.changeEmail(id, dto.email);
      }
      if (dto.phone) staff.phone = dto.phone;
      if (dto.secondaryPhone) staff.secondaryPhone = dto.secondaryPhone;
      if (dto.firstName) staff.firstName = dto.firstName;
      if (dto.lastName) staff.lastName = dto.lastName;
      if (dto.state) staff.state = dto.state;
      if (dto.gender) staff.gender = dto.gender;
      if (dto.birthday) staff.birthday = dto.birthday;
      if (dto.residency) staff.residency = dto.residency;
      if (dto.ssn) staff.ssn = dto.ssn;
      if (dto.middleName) staff.middleName = dto.middleName;
      if (dto.email) staff.email = dto.email;
      if (dto.secondaryEmail) staff.secondaryEmail = dto.secondaryEmail;
      if (dto.license) {
        staff.license = dto.license;
      }
      if (dto.address) staff.address = await this.addressService.getAddress(dto.address);
      staff = (
        await Promise.all([
          staff.save(),
          this.historyService.create({
            resource: staff._id,
            onModel: HistoryStatus.STAFF,
            title: serviceLog.updateStaff,
            user: staff._id,
          }),
        ])
      )[0];
      return this.sanitizer.sanitize(staff);
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
    const user = await this.model.findOne({ email });
    this.checkStaff(user);
    return this.sanitizer.sanitize(user);
  };

  /** returns all users */
  getUsers = async (
    skip: number,
    limit: number,
    status: string,
    isClinical: boolean,
  ): Promise<any> => {
    let query: any = {
      status: StaffStatus.ACTIVE,
    };
    if (status) query.status = status;
    if (isClinical) query.clinical = isClinical;
    const [staff, count] = await Promise.all([
      this.model.find({ query }).sort({ _id: -1 }).skip(skip).limit(limit),
      this.model.countDocuments({ status }),
    ]);
    const sanFun = this.sanitizer.sanitizeMany(staff);
    return { staff: sanFun, count };
  };
  /** activate the staff */
  inActive = async (_id: string, reason: string): Promise<StaffDTO> => {
    let staff = await this.model.findById(_id);
    this.checkStaff(staff);
    staff.termination.date = new Date(Date.now());
    reason ? (staff.termination.reason = reason) : undefined;
    staff.status = StaffStatus.INACTIVE;
    staff = (
      await Promise.all([
        staff.save(),
        this.historyService.create({
          resource: staff._id,
          onModel: HistoryStatus.STAFF,
          title: serviceLog.inactiveStaff,
          user: staff._id,
        }),
      ])
    )[0];
    return this.sanitizer.sanitize(staff);
  };
  /** inactive the staff */
  active = async (_id: string): Promise<StaffDTO> => {
    let staff = await this.model.findById(_id);
    this.checkStaff(staff);
    staff.termination.date = null;
    staff.termination.reason ? (staff.termination.reason = null) : undefined;
    staff.status = StaffStatus.ACTIVE;
    staff = (
      await Promise.all([
        staff.save(),
        this.historyService.create({
          resource: staff._id,
          onModel: HistoryStatus.STAFF,
          title: serviceLog.activeStaff,
          user: staff._id,
        }),
      ])
    )[0];
    return this.sanitizer.sanitize(staff);
  };

  /** Set isClinical of a staff Active */
  setClinical = async (id: string, status: boolean): Promise<StaffDTO> => {
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
      throw new HttpException(
        'Staff with this id was not found or staff is not clinical',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** check license details */
  private checkLicense(license: ILicense) {
    if (!license) {
      return;
    }
    if (license.driverLicense || license.expireDate || license.state) {
      if (!license.driverLicense || !license.expireDate || !license.state) {
        throw new HttpException(
          'driverLicense, expireDate, and expireDate are required',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}

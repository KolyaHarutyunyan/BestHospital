import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MongooseUtil } from '../util';
import { Model, Types } from 'mongoose';
import { EmploymentModel } from './employment.model';
import { IEmployment } from "./interface";
import { StaffService } from "../staff/staff.service";
import { DepartmentService } from '../department/department.service';
import { EmploymentDto, CreateEmploymentDto, UpdateEmploymentDto } from './dto';
import { EmploymentSanitizer } from './interceptor/employment.interceptor';

@Injectable()
export class EmploymentService {
  constructor(
    private readonly staffService: StaffService,
    private readonly departmentService: DepartmentService,
    private readonly sanitizer: EmploymentSanitizer
  ) {
    this.model = EmploymentModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IEmployment>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreateEmploymentDto): Promise<EmploymentDto> {
    try {
      const staff = await this.staffService.findById(dto.staffId);
      let employment = new this.model({
        staffId: dto.staffId,
        schedule: dto.schedule,
        termination: dto.termination,
        date: dto.date,
        title: dto.title
      });
      console.log(dto)
      if (dto.supervisor == dto.staffId) {
        throw new HttpException(
          'staff@ inq@ ir manager@ chi karox linel chnayac hayastanum hnaravor e',
          HttpStatus.NOT_FOUND,
        );
      }
      const findStaff = await this.staffService.findById(dto.supervisor);
      employment.supervisor = dto.supervisor;

      if (dto.departmentId) {
        let departmen = await this.departmentService.findOne(dto.departmentId)
        employment.departmentId = dto.departmentId;
      }
      employment = await employment.save();
      await employment.populate('departmentId', 'name').populate("supervisor", 'firstName').execPopulate();
      return this.sanitizer.sanitize(employment);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Employment already exists');
      throw e;
    }
  }

  async findAll(staffId: string): Promise<EmploymentDto[]> {
    const employments = await this.model.find({ staffId }).populate('departmentId', 'name').populate("supervisor", 'firstName');
    this.checkEmployment(employments[0])
    return this.sanitizer.sanitizeMany(employments);
  }

  async findOne(_id: string): Promise<EmploymentDto> {
    let employment = await this.model.findById({ _id }).populate('departmentId', 'name').populate("supervisor", 'firstName');
    this.checkEmployment(employment)
    return this.sanitizer.sanitize(employment);
  }
  async update(_id: string, dto: UpdateEmploymentDto): Promise<EmploymentDto> {
    let employment = await this.model.findById({ _id })
    this.checkEmployment(employment)
    if (dto.title) employment.title = dto.title;

    if (dto.supervisor == employment._id) {

      throw new HttpException(
        'staff@ inq@ ir manager@ chi karox linel chnayac hayastanum hnaravor e',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (dto.supervisor) {
      let employment: any = await this.model.findOne({ staffId: dto.supervisor });
      if (employment.length == []) {
        throw new HttpException(
          'supervisor is not found',
          HttpStatus.NOT_FOUND,
        );
      }
      employment.supervisor = dto.supervisor;
    }
    if (dto.departmentId) {
      let departmen = await this.departmentService.findOne(dto.departmentId)
      employment.departmentId = dto.departmentId;
    }
    if (dto.schedule) employment.schedule = dto.schedule;
    employment = await employment.save();
    await employment.populate('departmentId', 'name').populate("supervisor", 'firstName').execPopulate();
    return this.sanitizer.sanitize(employment);
  }
  remove(id: number) {
    return `This action removes a #${id} employment`;
  }
  /** Private methods */
  /** if the employment is not valid, throws an exception */
  private checkEmployment(employment: IEmployment) {
    if (!employment) {
      throw new HttpException(
        'Employment with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

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

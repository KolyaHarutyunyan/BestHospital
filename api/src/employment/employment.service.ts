import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MongooseUtil } from '../util';
import { Model, Types } from 'mongoose';
import { EmploymentModel } from './employment.model';
import { IEmployment } from "./interface";
import { StaffService } from "../staff/staff.service";
import { DepartmentService } from '../department/department.service';
import { EmploymentDto, CreateEmploymentDto } from './dto';

@Injectable()
export class EmploymentService {
  constructor(
    private readonly staffService: StaffService,
    private readonly departmentService: DepartmentService,
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
        date: dto.date
      });
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
      await employment.save();
      return employment;
      // return this.sanitizer.sanitize(user);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Employment already exists');
      throw e;
    }
  }

  findAll() {
    return `This action returns all employment`;
  }

  async findOne(_id: string): Promise<EmploymentDto> {
    let employment = await this.model.findById({ _id })
    this.checkEmployment(employment)
    return employment;
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

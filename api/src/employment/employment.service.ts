import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmploymentDto } from './dto/create.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import { MongooseUtil } from '../util';
import { Model, Types } from 'mongoose';
import { EmploymentModel } from './employment.model';
import { IEmployment } from "./interface";
import { StaffService } from "../staff/staff.service";

@Injectable()
export class EmploymentService {
  constructor(
    // private readonly terminationService: TerminationService,
    // private readonly sanitizer: EmploymentSanitizer,
    private readonly staffService: StaffService,

  ) {
    this.model = EmploymentModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IEmployment>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreateEmploymentDto) {
    try {
      const staff = await this.staffService.findById(dto.userId);
      let employment = new this.model({
        _id: dto.userId,
        schedule: dto.schedule,
      });
      if (dto.date) {
        const date = new Date(dto.date);
        this.checkTime(date);
        employment.date = date.toLocaleDateString()
      }
      if (dto.supervisor) {
        const staff = await this.staffService.findById(dto.supervisor);
        employment.supervisor = dto.supervisor
      }
      if (dto.departmentId) {
        //check department
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

  findOne(id: number) {
    return `This action returns a #${id} employment`;
  }

  update(id: number, updateEmploymentDto: UpdateEmploymentDto) {
    return `This action updates a #${id} employment`;
  }

  remove(id: number) {
    return `This action removes a #${id} employment`;
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

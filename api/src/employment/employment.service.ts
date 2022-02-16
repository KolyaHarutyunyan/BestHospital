import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MongooseUtil } from '../util';
import { Model } from 'mongoose';
import { EmploymentModel } from './employment.model';
import { IEmployment } from './interface';
import { StaffService } from '../staff/staff.service';
import { DepartmentService } from '../department/department.service';
import { EmploymentDto, CreateEmploymentDto, UpdateEmploymentDto } from './dto';
import { EmploymentSanitizer } from './interceptor/employment.interceptor';

@Injectable()
export class EmploymentService {
  constructor(
    private readonly staffService: StaffService,
    private readonly departmentService: DepartmentService,
    private readonly sanitizer: EmploymentSanitizer,
  ) {
    this.model = EmploymentModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IEmployment>;
  private mongooseUtil: MongooseUtil;

  // create the employment
  async create(dto: CreateEmploymentDto): Promise<EmploymentDto> {
    try {
      if (new Date(dto.startDate) > new Date(dto.endDate)) {
        throw new HttpException(`startDate can't be high then endDate`, HttpStatus.BAD_REQUEST);
      }
      const staff = await this.staffService.findById(dto.staffId);
      let employment = new this.model({
        staffId: dto.staffId,
        schedule: dto.schedule,
        termination: dto.termination,
        startDate: dto.startDate,
        title: dto.title,
      });
      const date = new Date().getTime();
      if (dto.endDate) {
        const endDate = new Date(dto.endDate).getTime();
        if (endDate >= date) {
          const activeEmployment = await this.model.findOne({ active: true, staffId: staff.id });
          if (activeEmployment) {
            activeEmployment.active = false;
            activeEmployment.endDate = new Date(
              new Date(dto.startDate).setDate(new Date(dto.startDate).getDate() - 1),
            );
            await activeEmployment.save();
          }
          employment.active = true;
        }
        employment.endDate = dto.endDate;
      }
      await this.staffService.findById(dto.supervisor);
      employment.supervisor = dto.supervisor;

      if (dto.departmentId) {
        await this.departmentService.findOne(dto.departmentId);
        employment.departmentId = dto.departmentId;
      }
      employment = await employment.save();
      await employment
        .populate('departmentId', 'name')
        .populate('supervisor', 'firstName')
        .execPopulate();
      return this.sanitizer.sanitize(employment);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'Employment already exists');
      throw e;
    }
  }

  // find all employments
  async findAll(staffId: string): Promise<EmploymentDto[]> {
    const employments = await this.model
      .find({ staffId })
      .populate('departmentId', 'name')
      .populate('supervisor', 'firstName');
    return this.sanitizer.sanitizeMany(employments);
  }

  // find employments by staff id
  async findAllEmploymentsByStaffId(staffId: string): Promise<string[]> {
    const ids = [];
    const employments = await this.model.find({ staffId });
    employments.map((employment) => {
      ids.push(employment._id);
    });
    return ids;
  }

  // find employment by id
  async findOne(_id: string): Promise<EmploymentDto> {
    const employment = await this.model
      .findById({ _id })
      .populate('departmentId', 'name')
      .populate('supervisor', 'firstName');
    this.checkEmployment(employment);
    return this.sanitizer.sanitize(employment);
  }

  // update the employment
  async update(_id: string, dto: UpdateEmploymentDto): Promise<EmploymentDto> {
    if (new Date(dto.startDate) > new Date(dto.endDate)) {
      throw new HttpException(`startDate can't be high then endDate`, HttpStatus.BAD_REQUEST);
    }
    let employment = await this.model.findById({ _id });
    this.checkEmployment(employment);
    if (dto.title) employment.title = dto.title;
    if (dto.supervisor == employment._id) {
      throw new HttpException(
        'staff@ inq@ ir manager@ chi karox linel chnayac hayastanum hnaravor e',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (dto.supervisor) {
      const staff = await this.staffService.findById(dto.supervisor);
      if (!staff) {
        throw new HttpException('supervisor is not found', HttpStatus.NOT_FOUND);
      }
      employment.supervisor = dto.supervisor;
    }
    if (dto.departmentId) {
      await this.departmentService.findOne(dto.departmentId);
      employment.departmentId = dto.departmentId;
    }
    if (dto.schedule) employment.schedule = dto.schedule;
    const date = new Date().getTime();
    if (dto.endDate) {
      const endDate = new Date(dto.endDate).getTime();
      if (endDate >= date) {
        const activeEmployment = await this.model.findOne({
          active: true,
          staffId: employment.staffId,
        });
        if (activeEmployment) {
          activeEmployment.active = false;
          activeEmployment.endDate = new Date(
            new Date(dto.startDate).setDate(new Date(dto.startDate).getDate() - 1),
          );
          await activeEmployment.save();
        }
        employment.active = true;
      }
      employment.endDate = dto.endDate;
    } else {
      employment.active = true;
    }
    if (dto.startDate) employment.startDate = dto.startDate;
    employment = await employment.save();
    await employment
      .populate('departmentId', 'name')
      .populate('supervisor', 'firstName')
      .execPopulate();
    return this.sanitizer.sanitize(employment);
  }

  // remove the employment
  remove(id: number) {
    return `This action removes a #${id} employment`;
  }

  /** Private methods */
  /** if the employment is not valid, throws an exception */
  private checkEmployment(employment: IEmployment) {
    if (!employment) {
      throw new HttpException('Employment with this id was not found', HttpStatus.NOT_FOUND);
    }
  }

  /** if the date is not valid, throws an exception */
  private checkTime(date: Date) {
    if (isNaN(date.getTime())) {
      throw new HttpException('Date with this format was not found', HttpStatus.NOT_FOUND);
    }
  }
}

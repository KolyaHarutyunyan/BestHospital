import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DepartmentService } from '../department/department.service';
import { StaffService } from '../staff/staff.service';
import { MongooseUtil } from '../util';
import { CreateEmploymentDto, EmploymentDto, UpdateEmploymentDto } from './dto';
import { EmploymentModel } from './employment.model';
import { EmploymentSanitizer } from './interceptor/employment.interceptor';
import { IEmployment } from './interface';
import * as dateFns from 'date-fns';
import { JobService } from '../job/job.service';
import { CreateTerminationDto } from '../termination/dto';
@Injectable()
export class EmploymentService {
  constructor(
    private readonly staffService: StaffService,
    private readonly jobService: JobService,
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
      if (dto.endDate && new Date(dto.startDate) > new Date(dto.endDate)) {
        throw new HttpException(
          `startDate can't be greater than the endDate`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const [employments] = await Promise.all([
        this.model.find({ staffId: dto.staffId, active: true }),
        this.checkOverlap(null, dto.startDate, dto.endDate),
        this.staffService.findById(dto.staffId),
        this.jobService.findOne(dto.title),
      ]);
      if (employments.length !== 0) {
        throw new HttpException(
          'Can not be two active employment with the same staff',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (dto.supervisor) {
        const supervisor = await this.staffService.findById(dto.supervisor);
        if (!supervisor) {
          throw new HttpException('supervisor is not found', HttpStatus.NOT_FOUND);
        }
      }
      let employment = new this.model({
        staffId: dto.staffId,
        schedule: dto.schedule,
        type: dto.type,
        startDate: dto.startDate,
        endDate: dto.endDate ? dto.endDate : null,
        title: dto.title,
        supervisor: dto.supervisor,
      });

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
      .populate('title')
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
      .populate('title')
      .populate('supervisor', 'firstName');
    this.checkEmployment(employment);
    return this.sanitizer.sanitize(employment);
  }

  // update the employment
  async update(_id: string, dto: UpdateEmploymentDto): Promise<EmploymentDto> {
    if (dto.endDate && new Date(dto.startDate) > new Date(dto.endDate)) {
      throw new HttpException(`startDate can't be high then endDate`, HttpStatus.BAD_REQUEST);
    }
    let [employment] = await Promise.all([
      this.model.findById({ _id }),
      this.checkOverlap(_id, dto.startDate, dto.endDate),
    ]);
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
    if (dto.title) {
      await this.jobService.findOne(dto.title);
      employment.title = dto.title;
    }
    if (dto.schedule) employment.schedule = dto.schedule;
    if (dto.type) employment.type = dto.type;

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
    if (dto.endDate == null) {
      employment.endDate = null;
    }
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
  /** check employments status (appointment) */
  checkEmploymentActive(status: boolean) {
    if (!status) {
      throw new HttpException('employment is not active', HttpStatus.BAD_REQUEST);
    }
  }
  /** check if employment date is today than set active */
  async setEmploymentActive() {
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const employments = await this.model.find();
    for (let i = 0; i < employments.length; i++) {
      if (
        new Date(employments[i].startDate).getDate() === day &&
        new Date(employments[i].startDate).getMonth() === month &&
        new Date(employments[i].startDate).getFullYear() === year
      ) {
        employments[i].active = true;
        await employments[i].save();
      }
    }
    return 'ok';
  }
  // activated the payCode
  async active(_id: string): Promise<EmploymentDto> {
    const employment = await this.model.findById(_id);
    const employments = await this.model.find({ staffId: employment.staffId, active: true });
    this.checkEmployment(employment);
    if (employments.length !== 0) {
      throw new HttpException(
        'Can not be two active employment with the same staff',
        HttpStatus.BAD_REQUEST,
      );
    }
    employment.active = true;
    await employment.save();
    return this.sanitizer.sanitize(employment);
  }
  // inactivated the payCode
  async inActive(_id: string): Promise<EmploymentDto> {
    const employment = await this.model.findById(_id);
    this.checkEmployment(employment);
    employment.active = false;
    await employment.save();
    return this.sanitizer.sanitize(employment);
  }
  /** terminate the client */
  async terminate(_id: string, dto: CreateTerminationDto): Promise<EmploymentDto> {
    if (!dto.date) {
      throw new HttpException(
        'If status is hold, then date is required field',
        HttpStatus.BAD_REQUEST,
      );
    }
    const employment = await this.model.findById({ _id });
    this.checkEmployment(employment);
    employment.termination.date = dto.date;
    employment.termination.reason = dto.reason;
    await employment.save();
    return this.sanitizer.sanitize(employment);
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
  /** check appointment overlapping */
  private async checkOverlap(_id: string = null, startDate: Date, endDate: Date) {
    // 1
    const employment = await this.model.find({
      startDate: {
        $gte: dateFns.startOfDay(new Date(startDate)),
        $lte: dateFns.endOfDay(new Date(startDate)),
      },
    });
    if (employment[0] && employment[0]._id.toString() !== _id.toString()) {
      throw new HttpException(`employment overlapping3`, HttpStatus.BAD_REQUEST);
    }
    // 2
    if (endDate) {
      const overlappingEmpl = await this.model.find({
        startDate: { $lt: new Date(endDate) },
        endDate: { $gt: new Date(startDate) },
      });
      if (overlappingEmpl[0]) {
        if (_id) {
          if (overlappingEmpl[0] && overlappingEmpl[0]._id.toString() !== _id.toString()) {
            throw new HttpException(`employment overlapping`, HttpStatus.BAD_REQUEST);
          }
        } else {
          throw new HttpException(`employment overlapping`, HttpStatus.BAD_REQUEST);
        }
      }
    } else {
      const employments = await this.model.find();
      for (let i = 0; i < employments.length; i++) {
        if (employments[i].endDate == null) {
          throw new HttpException('end date must be entered', HttpStatus.BAD_REQUEST);
        } else if (
          new Date(startDate) > new Date(employments[i].startDate) &&
          new Date(startDate) < new Date(employments[i].endDate)
        ) {
          throw new HttpException('employment overlapping', HttpStatus.BAD_REQUEST);
        } else if (new Date(startDate) < new Date(employments[i].startDate)) {
          throw new HttpException('employment overlapping', HttpStatus.BAD_REQUEST);
        }
      }
      if (employment.length !== 0) {
        throw new HttpException('end date must be entered', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
// for (let i = 0; i < overlapping.length; i++) {
//   if (
//     new Date(startDate) < new Date(overlapping[i].startDate) &&
//     !endDate &&
//     _id.toString() !== overlapping[i]._id.toString()
//   ) {
//     throw new HttpException(`employment overlapping1`, HttpStatus.BAD_REQUEST);
//   } else if (new Date(startDate) < new Date(overlapping[i].startDate) && endDate) {
//     if (new Date(endDate) >= new Date(overlapping[i].startDate)) {
//       throw new HttpException(`employment overlapping2`, HttpStatus.BAD_REQUEST);
//     }
//   } else if (new Date(startDate) > new Date(overlapping[i].startDate)) {
//     if (overlapping[i].endDate && new Date(overlapping[i].endDate) >= new Date(startDate)) {
//       overlapping[i].endDate = new Date(
//         new Date(startDate).setDate(new Date(startDate).getDate() - 1),
//       );
//     } else if (!overlapping[i].endDate && !endDate) {
//       overlapping[i].endDate = new Date(
//         new Date(startDate).setDate(new Date(startDate).getDate() - 1),
//       );
//     }
//     await overlapping[i].save();
//   }
// }

import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../../util';
import { CreateTimesheetDTO, TimeSheetDTO } from './dto';
import { StaffService } from '../staff.service';
import { PaycodeService } from '../../employment/paycode/paycode.service';
import { ITimeSheet } from './interface';
import { TimeSheetModel } from './timesheet.model';
import { TimeSheetSanitizer } from './interceptor';
import { OvertimeService } from '../../overtime/overtime.service';

@Injectable()
export class TimesheetService {
  constructor(
    private readonly staffService: StaffService,
    private readonly overtimeService: OvertimeService,
    private readonly payCodeService: PaycodeService,
    private readonly sanitizer: TimeSheetSanitizer
  ) {
    this.model = TimeSheetModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<ITimeSheet>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreateTimesheetDTO): Promise<any> {
    try {
      const bigOvertime = [];
      const staff = await this.staffService.findById(dto.staffId);
      const payCode = await this.payCodeService.findOne(dto.payCode);
      const overtime = await this.overtimeService.findAll();
      overtime.map(time => {
        if (time.threshold > dto.hours) {
          return
        }
        bigOvertime.push({ threshold: time.threshold, multiplier: time.multiplier, type: time.type })
        // overtimes.push(time.threshold)
      })
      console.log(bigOvertime, 'bigOvertime');
      let maxMultiplier = 0;
      let maxThreshold = 0;
      for (let i = 0; i < bigOvertime.length; i++) {
        if (bigOvertime[i].multiplier >= maxMultiplier) { 
          maxMultiplier = bigOvertime[i].multiplier;
          maxThreshold = bigOvertime[i].threshold;
          console.log(maxMultiplier, 'maxMultiplier > ');
        }
      }
      console.log(maxMultiplier);
      console.log(maxThreshold);

      // const maxMultiplier = Math.max.apply(Math, bigOvertime.map(function(overtime) { return overtime }));

      // const sortingOvertimes = overtimes.sort((a, b) => a - b);

      // overtimes.push(overtime)
      // let timesheet = new this.model({
      //   staffId: staff._id,
      //   payCode: payCode.id,
      //   description: dto.description,
      //   hours: dto.hours,
      //   startDate: dto.startDate,
      //   endDate: dto.endDate ? dto.endDate : null
      // });

      // await timesheet.save();
      // return this.sanitizer.sanitize(timesheet);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'TimeSheet already exists');
      throw e;
    }
  }

  // findAll() {
  //   return `This action returns all timesheet`;
  // }

  async findOne(_id: string): Promise<TimeSheetDTO> {
    try {
      const timesheet: any = await this.model.findById(_id).populate({
        path: 'payCode',
        populate: { path: 'payCodeTypeId' }
      });
      this.checkTimeSheet(timesheet)
      if (timesheet.payCode.payCodeTypeId.overtime) {
        if (timesheet.hours > 8 && timesheet.hours < 12 && timesheet.payCode.payCodeTypeId.type === "Daily") {
          timesheet.amount = timesheet.payCode.rate * timesheet.hours;
        }
      }
      return this.sanitizer.sanitize(timesheet);
    }
    catch (e) {
      throw e
    }
  }

  // update(id: number, updateTimesheetDto: UpdateTimesheetDto) {
  //   return `This action updates a #${id} timesheet`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} timesheet`;
  // }

  /** Private methods */
  /** if the timesheet is not valid, throws an exception */
  private checkTimeSheet(timesheet: ITimeSheet) {
    if (!timesheet) {
      throw new HttpException(
        'timesheet with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

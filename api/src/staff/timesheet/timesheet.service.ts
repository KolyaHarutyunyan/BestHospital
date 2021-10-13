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

var bigAmount = 0;
var dailyAmount = 0;
var weeklyAmount = 0;
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
      bigAmount = 0;
      dailyAmount = 0;
      weeklyAmount = 0;
      const bigOvertime = [];
      const staff = await this.staffService.findById(dto.staffId);
      const payCode: any = await this.payCodeService.findOne(dto.payCode);
      const overtime = await this.overtimeService.findAll();
      const total = await this.getTotalAmount(payCode, overtime, dto, bigAmount);
     
      let timesheet = new this.model({
        staffId: staff._id,
        payCode: payCode.id,
        description: dto.description,
        hours: dto.hours,
        startDate: dto.startDate,
        endDate: dto.endDate ? dto.endDate : null,
        totalAmount: bigAmount
      });
      timesheet = await (await timesheet.save()).populate({  path: 'payCode',
      populate: { path: 'payCodeTypeId' }}).execPopulate();

      return this.sanitizer.sanitize(timesheet);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'TimeSheet already exists');
      throw e;
    }
  }

  async getTotalAmount(payCode, overtime, dto, totalAmount) {
    var maxMultiplier;
    if (payCode.payCodeTypeId.overtime) {
      maxMultiplier = await this.getMaxMultiplier(overtime);
      if (maxMultiplier.type == 'DAILY') {
        const getDayTimesheet = await this.getDailyTimesheet(dto.startDate);
        if (getDayTimesheet.length == []) {
          bigAmount += dto.hours * payCode.rate;
          return
        }
        getDayTimesheet.map(timesheet => {
          dailyAmount += timesheet.hours
        })
        dailyAmount += dto.hours;
        if (dailyAmount < maxMultiplier.threshold) {
          const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
          if (filteredDays.length == []) {
            bigAmount = bigAmount + dto.hours * payCode.rate;
            return bigAmount
          }
          await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)
        }
        else {
          const difference = await dto.hours - maxMultiplier.threshold;
          if (difference < 0 || difference == 0) {
            maxMultiplier.threshold - dto.hours;
            bigAmount += dto.hours * payCode.rate * maxMultiplier.multiplier;
            return
          }
          const amount = (dto.hours - difference) * payCode.rate * maxMultiplier.multiplier;
          bigAmount = (bigAmount + amount);
          const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
          dto.hours = difference;
          await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)
        }
      }
      else if (maxMultiplier.type == 'WEEKLY') {
        const week = await this.getWeekly(dto.endDate);
        if (week.length == []) {
          bigAmount += dto.hours * payCode.rate;
          return
        }
        week.map(timesheet => {
          weeklyAmount += timesheet.hours
        })
        weeklyAmount += dto.hours;
        if (weeklyAmount < maxMultiplier.threshold) {
          const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
          if (filteredDays.length == []) {
            bigAmount = bigAmount + dto.hours * payCode.rate;
            return bigAmount
          }
          await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)
        }
        else {
          const difference = await dto.hours - maxMultiplier.threshold;
          if (difference < 0 || difference == 0) {
            maxMultiplier.threshold - dto.hours;
            bigAmount += dto.hours * payCode.rate * maxMultiplier.multiplier;
            return
          }
          const amount = (dto.hours - difference) * payCode.rate * maxMultiplier.multiplier;
          bigAmount = (bigAmount + amount);
          const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
          dto.hours = difference;
          await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)
        }
      }
      else if (maxMultiplier.type == 'CONSECUTIVE') {
        const consecutive = await this.getConsecutive(dto.hours, dto.endDate);
        if (consecutive) {
          console.log('1');
          bigAmount += payCode.rate * dto.hours;
          return
        }
        console.log('2');
        bigAmount += dto.hours * maxMultiplier.multiplier * payCode.rate;
        return
      }
    }
    bigAmount += dto.hours * payCode.rate;
  }
  async getMaxMultiplier(overtime) {
    const maxMultiplier = overtime.reduce(function (prev, current) {
      if (prev.multiplier > current.multiplier) {
        return prev
      }
      else if (prev.multiplier == current.multiplier && prev.threshold > current.threshold) {
        return prev
      }
      else if (prev.multiplier == current.multiplier && prev.threshold < current.threshold) {
        return current
      }
      else {
        return current
      }
    }, 0);
    return maxMultiplier;
  }
  async getDailyTimesheet(date): Promise<any> {
    try {
      const timesheets = await this.model.find({
        createdDate: {
          $gte: new Date(new Date(date).setHours(0, 0, 0)),
          $lt: new Date(new Date(date).setHours(23, 59, 59))
        }
      })
      return timesheets;
    }
    catch (e) {
      throw e
    }
  }
  async getWeekly(endDate): Promise<any> {
    try {
      var curr = new Date(endDate); // get current date
      var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
      var last = first + 5; // last day is the first day + 6
      var firstday = new Date(curr.setDate(first));
      var lastday = new Date(curr.setDate(last));
      const timesheets = await this.model.find({
        createdDate: { $gte: firstday, $lte: lastday }
      });
      return timesheets;
    }
    catch (e) {
      throw e
    }
  }
  async getConsecutive(day, endDate): Promise<any> {
    try {
      let arr;
      var curr = new Date(endDate);
      var first = curr.getDate() - day + 1;
      var last = curr.getDate() + 1;
      const lastday = new Date(curr.setDate(last))
      var firstday = new Date(curr.setDate(first));
      const timesheets = await this.model.find({
        createdDate: { $gte: firstday, $lte: lastday }
      }).sort({ createdDate: - 1 }).select('createdDate');
      arr = timesheets;
      for (let j = 0; j < arr.length - 1; j++) {
        let date = new Date(arr[j].createdDate);
        let nextDate = new Date(arr[j + 1].createdDate);
        if (date.getDay() == nextDate.getDay()) {
          arr.splice(j, 1)
        }
      }
      return arr.length < day;
    }
    catch (e) {
      throw e
    }
  }

  async findOne(_id: string): Promise<TimeSheetDTO> {
    try {
      const timesheet: any = await this.model.findById(_id).populate({
        path: 'payCode',
        populate: { path: 'payCodeTypeId' }
      });
      this.checkTimeSheet(timesheet)
      return this.sanitizer.sanitize(timesheet);
    }
    catch (e) {
      throw e
    }
  }

  async findAll(staffId: string): Promise<TimeSheetDTO[]> {
    try {
      const timesheet: any = await this.model.find({ staffId }).populate({
        path: 'payCode',
        populate: { path: 'payCodeTypeId' }
      });
      this.checkTimeSheet(timesheet)
      return this.sanitizer.sanitizeMany(timesheet);
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

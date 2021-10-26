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
const ids = [];
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
      // console.log(ids);
      let timesheet = new this.model({
        staffId: staff._id,
        payCode: payCode.id,
        description: dto.description,
        hours: dto.hours,
        startDate: dto.startDate,
        endDate: dto.endDate ? dto.endDate : null,
        totalAmount: bigAmount
      });
      timesheet = await (await timesheet.save()).populate({
        path: 'payCode',
        populate: { path: 'payCodeTypeId' }
      }).execPopulate();

      return this.sanitizer.sanitize(timesheet);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'TimeSheet already exists');
      throw e;
    }
  }

  async getTotalAmount(payCode, overtime, dto, totalAmount) {
    console.log( overtime, 'overtime', dto.hours, 'dto', totalAmount, 'totalAmount');
    if (overtime.length == []) {
      bigAmount += dto.hours * payCode.rate;
      return
    }
    var maxMultiplier;
    if (payCode.payCodeTypeId.overtime) {
      maxMultiplier = await this.getMaxMultiplier(overtime);
      if (maxMultiplier.type == 'DAILY') {
        console.log('daily');
        const getDayTimesheet = await this.getDailyTimesheet(dto.startDate);
        // if not find any daily timesheet
        if (getDayTimesheet.length == [] && dto.hours < maxMultiplier.threshold) {
          bigAmount += dto.hours * payCode.rate;
          return
        }
        // if find daily timesheets then count of hours ? :)
        getDayTimesheet.map(timesheet => {
          dailyAmount += timesheet.hours
        })
        dailyAmount += dto.hours;
        // if dailyAmount less then maxMultiplier(overtime rule) then delete current maxMultiplier and skip that
        if (dailyAmount < maxMultiplier.threshold) {
          const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
          // if can't find any maxMultiplier(overtime rule) then count by ordinary rate
          if (filteredDays.length == []) {
            bigAmount = bigAmount + dto.hours * payCode.rate;
            return bigAmount
          }
          //skip current maxMultiplier(overtime rule) and find another maxMultiplier
          ids.push(maxMultiplier)
          await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)
        }
        else {
          // count difference and get amount with rate
          const difference = dto.hours - maxMultiplier.threshold;
          // if difference less than 0 count rate and return, if not then call function again for calculating remaining hours
          if (difference < 0 || difference == 0) {
            maxMultiplier.threshold - dto.hours;
            bigAmount += dto.hours * payCode.rate * maxMultiplier.multiplier;
            return
          }
          const amount = difference * payCode.rate * maxMultiplier.multiplier;
          bigAmount = (bigAmount + amount);
          const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
          dto.hours = difference;
          ids.push(maxMultiplier)
          await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)
        }
      }
      else if (maxMultiplier.type == 'WEEKLY') {
        console.log('weekly');

        const week = await this.getWeekly(dto.endDate);
        console.log(week, 'weeeeeeeek');
        if (week.length == [] && dto.hours < maxMultiplier.threshold) {
          console.log(week, 'mtavvvvv');
          const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
          await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)

          // bigAmount += dto.hours * payCode.rate;
          // return
        }
        week.map(timesheet => {
          weeklyAmount += timesheet.hours
        })
        weeklyAmount += dto.hours;
        console.log(weeklyAmount, 'weeklyAmount', dto.hours)
        if (weeklyAmount < maxMultiplier.threshold) {
          const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
          // if (filteredDays.length == []) {
          //   bigAmount = bigAmount + dto.hours * payCode.rate;
          //   return bigAmount
          // }
          // ids.push(maxMultiplier)
          await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)
        }
        else {
          const difference = weeklyAmount - maxMultiplier.threshold;
          if (difference < 0 || difference == 0) {
            const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
            await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)

            // maxMultiplier.threshold - dto.hours;
            // bigAmount += dto.hours * payCode.rate * maxMultiplier.multiplier;
            // return
          }
          const amount = difference * payCode.rate * maxMultiplier.multiplier;
          bigAmount = (bigAmount + amount);
          const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
          dto.hours = dto.hours - difference;
          ids.push(maxMultiplier)
          await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)
        }
      }
      else if (maxMultiplier.type == 'CONSECUTIVE') {
        console.log('consecutive');

        const consecutive = await this.getConsecutive(dto.hours, dto.endDate);
        if (consecutive) {
          const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
          await this.getTotalAmount(payCode, filteredDays, dto, bigAmount)

          // bigAmount += payCode.rate * dto.hours;
          // return
        }
        // ids.push('aaaaaa')

        bigAmount += dto.hours * maxMultiplier.multiplier * payCode.rate;
        ids.push(maxMultiplier)
        return
      }
    }
    else {
      bigAmount += dto.hours * payCode.rate;
    }
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
      console.log(day, endDate, 'aaaaa')
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
      console.log(arr.length, 'arr', day);
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

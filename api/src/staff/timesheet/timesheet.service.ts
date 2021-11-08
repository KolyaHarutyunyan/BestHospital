import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaycodeService } from '../../employment/paycode/paycode.service';
import { OvertimeService } from '../../overtime/overtime.service';
import { MongooseUtil } from '../../util';
import { StaffService } from '../staff.service';
import { CreateTimesheetDTO, TimeSheetDTO } from './dto';
import { TimeSheetSanitizer } from './interceptor';
import { ITimeSheet } from './interface';
import { TimeSheetModel } from './timesheet.model';

var bigAmount = 0;
var dailyAmount = 0;
var weeklyAmount = 0;
var orderRate = 0;
let ids = [];
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
      ids = [];
      const bigOvertime = [];
      const staff = await this.staffService.findById(dto.staffId);
      const payCode: any = await this.payCodeService.findOne(dto.payCode);
      const overtime = await this.overtimeService.findAll();
      let hours = dto.hours;
      const getDayTimesheet = await this.getDailyTimesheet(dto.startDate);
      const week = await this.getWeekly(dto.endDate);
      const consecutive = await this.getConsecutive(dto.hours, dto.endDate);
      const total = await this.getTotalAmount(payCode, overtime, dto, bigAmount, getDayTimesheet, week, consecutive);

      console.log(total, 'totalll', bigAmount)
      // let timesheet = new this.model({
      //   staffId: staff._id,
      //   payCode: payCode.id,
      //   description: dto.description,
      //   hours,
      //   startDate: dto.startDate,
      //   endDate: dto.endDate ? dto.endDate : null,
      //   totalAmount: dto.totalAmount
      // });
      // timesheet = await (await timesheet.save()).populate({
      //   path: 'payCode',
      //   populate: { path: 'payCodeTypeId' }
      // }).execPopulate();
      return { total: dto.totalAmount, ids, orderRate }
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'TimeSheet already exists');
      throw e;
    }
  }

  async getTotalAmount(payCode, overtime, dto, bigAmount, getDayTimesheet = null, week = null, consecutive = null) {
    dailyAmount = 0;
    weeklyAmount = 0;
    if (!overtime.length) {
      console.log(overtime, 'overtimeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

      bigAmount += dto.hours * payCode.rate;
      orderRate += dto.hours * payCode.rate;
      console.log(bigAmount, 'bigAmountbigAmountbigAmountbigAmountbigAmountbigAmountbigAmountbigAmountbigAmountbigAmount');

      dto.totalAmount = bigAmount;
      return dto
    }
    var maxMultiplier;
    if (payCode.payCodeTypeId.overtime) {
      maxMultiplier = await this.getMaxMultiplier(overtime);
      console.log(maxMultiplier, 'maxxxxxxxxxxxxxxxxxxxxxxx');
      if (maxMultiplier.type == 'DAILY') {
        await this.dailyTimesheet(payCode, overtime, dto, bigAmount, maxMultiplier, getDayTimesheet, week);
      }
      else if (maxMultiplier.type == 'WEEKLY') {
        await this.weeklyTimesheet(payCode, overtime, dto, bigAmount, maxMultiplier, getDayTimesheet, week);
      }
      else if (maxMultiplier.type == 'CONSECUTIVE') {
        await this.consecutive(payCode, overtime, dto, bigAmount, maxMultiplier, getDayTimesheet, week, consecutive)
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
      var last = first - 7; // last day is the first day + 6
      var firstday = new Date(curr.setDate(first));
      var lastday = new Date(curr.setDate(last));
      console.log(firstday, 'firstdayyyyyyyy');
      console.log(lastday, 'lastdayyyyyyyyy')
      const timesheets = await this.model.find({
        createdDate: { $gte: lastday, $lte: firstday }
      });
      return timesheets;
    }
    catch (e) {
      throw e
    }
  }
  async getConsecutive(day, endDate): Promise<any> {
    try {
      console.log(day, 'dayyyyyy')
      let arr;
      var curr = new Date(endDate);
      var first = curr.getDate() - day;
      var last = curr.getDate() + 1;
      const lastday = new Date(curr.setDate(last))
      var firstday = new Date(curr.setDate(first));
      console.log(lastday, 'lastday CONSECUTIVE');
      console.log(firstday, 'firstday CONSECUTIVE');

      const timesheets = await this.model.find({
        createdDate: { $gte: firstday, $lte: lastday }
      }).sort({ createdDate: - 1 }).select('createdDate');
      arr = timesheets;
      console.log(arr, 'arrr Timesheets');
      for (let j = 0; j < arr.length - 1; j++) {
        let date = new Date(arr[j].createdDate);
        let nextDate = new Date(arr[j + 1].createdDate);
        if (date.getDay() == nextDate.getDay()) {
          arr.splice(j, 1)
        }
      }
      console.log('last Arr', arr, 'day', day)
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

  async dailyTimesheet(payCode, overtime, dto, bigAmount, maxMultiplier, getDayTimesheet, week): Promise<any> {
    console.log('daily');

    // if not find any daily timesheet
    if (getDayTimesheet.length == [] && dto.hours <= maxMultiplier.threshold) {
      const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
      // if can't find any maxMultiplier(overtime rule) then count by ordinary rate
      if (filteredDays.length == []) {
        bigAmount += dto.hours * payCode.rate;
        orderRate += dto.hours * payCode.rate;
        dto.totalAmount = bigAmount;
        return dto
      }
      return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week)
    }
    // if find daily timesheets then count of hours ? :)
    getDayTimesheet.map(timesheet => {
      dailyAmount += timesheet.hours
    })
    console.log(getDayTimesheet, 'getDailyTimesheet');
    dailyAmount += dto.hours;
    console.log(dailyAmount, 'dailyAmount');
    // if dailyAmount less then maxMultiplier(overtime rule) then delete current maxMultiplier and skip that
    if (dailyAmount <= maxMultiplier.threshold) {
      console.log(dailyAmount, 'DailyAmount IF BLOCK', maxMultiplier.threshold);
      const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
      // if can't find any maxMultiplier(overtime rule) then count by ordinary rate
      if (filteredDays.length == []) {
        bigAmount = bigAmount + dto.hours * payCode.rate;
        orderRate += dto.hours * payCode.rate
        dto.totalAmount = bigAmount;
        return dto
      }
      //skip current maxMultiplier(overtime rule) and find another maxMultiplier
      // ids.push(maxMultiplier)
      return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week)
    }
    else {
      console.log('else')
      let difference;
      // count difference and get amount with rate
      if (dailyAmount >= maxMultiplier.threshold) {
        difference = dailyAmount - maxMultiplier.threshold;
      }
      else {
        const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
        if (filteredDays.length == []) {
          maxMultiplier.threshold - dto.hours;
          bigAmount += dto.hours * payCode.rate;
          orderRate += dto.hours * payCode.rate
          dto.totalAmount = bigAmount;
          return dto
        }
        return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week)
      }
      // const difference = (dto.hours >= maxMultiplier.threshold) ? dto.hours - maxMultiplier.threshold : dailyAmount - maxMultiplier.threshold;
      console.log(difference, 'difference')

      // if difference less than 0 count rate and return, if not then call function again for calculating remaining hours
      if (difference < 0 || difference == 0) {
        const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
        if (filteredDays.length == []) {
          maxMultiplier.threshold - dto.hours;
          bigAmount += dto.hours * payCode.rate;
          orderRate += dto.hours * payCode.rate
          dto.totalAmount = bigAmount;
          return dto
        }
        return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week)

      }
      const amount = difference * payCode.rate * maxMultiplier.multiplier;
      bigAmount = (bigAmount + amount);
      console.log(bigAmount, 'bigAmount');
      const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
      dailyAmount -= difference;
      dto.hours -= difference;
      console.log(dailyAmount, 'dailyAmountdailyAmount');
      console.log(dto.hours, ' dto.hours dto.hours');
      maxMultiplier.hours = difference;
      ids.push(maxMultiplier)
      if (dto.hours == 0) {
        dto.totalAmount = bigAmount;
        return dto;
      }

      return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week)
    }
  }

  async weeklyTimesheet(payCode, overtime, dto, bigAmount, maxMultiplier, getDayTimesheet, week): Promise<any> {
    console.log('weekly');

    if (week.length == [] && dto.hours <= maxMultiplier.threshold) {
      console.log(week, 'mtavvvvv');
      const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
      return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week)

      // bigAmount += dto.hours * payCode.rate;
      // return
    }
    week.map(timesheet => {
      weeklyAmount += timesheet.hours
    })
    weeklyAmount += dto.hours;
    console.log(weeklyAmount, 'weeklyAmount', dto.hours)
    if (weeklyAmount <= maxMultiplier.threshold) {
      console.log('IF BLOCK WEEKLY')
      const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
      // if can't find any maxMultiplier(overtime rule) then count by ordinary rate
      if (filteredDays.length == []) {
        bigAmount = bigAmount + dto.hours * payCode.rate;
        orderRate += dto.hours * payCode.rate
        dto.totalAmount = bigAmount;
        return dto
      }
      return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week)
    }
    else {
      console.log('ELSE WEEKLY')
      let difference;
      if (weeklyAmount >= maxMultiplier.threshold) {
        difference = dto.hours >= maxMultiplier.threshold ? dto.hours - (dto.hours - maxMultiplier.threshold) : dto.hours;
        dto.hours = difference;
      } else {
        const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
        if (filteredDays.length == []) {
          maxMultiplier.threshold - dto.hours;
          bigAmount += dto.hours * payCode.rate;
          orderRate += dto.hours * payCode.rate
          dto.totalAmount = bigAmount;
          return dto
        }
        return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week)
      }

      console.log(difference, 'differenceWeekly');
      if (difference < 0 || difference == 0) {
        console.log(difference, 'diference < 0');

        const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
        if (filteredDays.length == []) {
          maxMultiplier.threshold - dto.hours;
          bigAmount += dto.hours * payCode.rate;
          orderRate += dto.hours * payCode.rate
          dto.totalAmount = bigAmount;
          return dto
        }
        return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week)

        // maxMultiplier.threshold - dto.hours;
        // bigAmount += dto.hours * payCode.rate * maxMultiplier.multiplier;
        // return
      }
      const amount = difference * payCode.rate * maxMultiplier.multiplier;
      console.log(amount, 'amountWeekly');
      bigAmount = (bigAmount + amount);
      console.log(bigAmount, 'bigAmountWeekly');
      const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
      dto.hours = dto.hours - difference;
      weeklyAmount -= difference;
      console.log(dto.hours, 'dto.hoursWeekly', weeklyAmount);
      ids.push(maxMultiplier)
      if (dto.hours == 0) {
        dto.totalAmount = bigAmount;
        return dto;
      }
      return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week)
    }
  }
  async consecutive(payCode, overtime, dto, bigAmount, maxMultiplier, getDayTimesheet, week, consecutive): Promise<any> {
    console.log('consecutive');

    console.log(consecutive, 'consecutiveee');
    if (consecutive) {
      console.log(consecutive, 'if BLOCK CONSECUTIVE');
      const filteredDays = overtime.filter(day => day.id !== maxMultiplier.id);
      return await this.getTotalAmount(payCode, filteredDays, dto, bigAmount, getDayTimesheet, week, consecutive)

      // bigAmount += payCode.rate * dto.hours;
      // return
    }
    // ids.push('aaaaaa')

    bigAmount += dto.hours * maxMultiplier.multiplier * payCode.rate;

    ids.push(maxMultiplier);
    dto.totalAmount = bigAmount;
    console.log('verj');
    return dto;
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

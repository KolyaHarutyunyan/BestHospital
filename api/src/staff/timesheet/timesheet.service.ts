import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PayCodeDTO } from 'src/employment/paycode/dto';
import { OvertimeDTO } from 'src/overtime/dto';
import { OvertimeStatus } from 'src/overtime/overtime.constants';
import { PaycodeService } from '../../employment/paycode/paycode.service';
import { OvertimeService } from '../../overtime/overtime.service';
import { MongooseUtil } from '../../util';
import { StaffService } from '../staff.service';
import { CreateTimesheetDTO, TimeSheetDTO } from './dto';
import { TimeSheetSanitizer } from './interceptor';
import { ICalculatedOT, ITimeSheet } from './interface';
import { IPayTable } from './interface/paytable.interface';
import { TimeSheetModel } from './timesheet.model';

@Injectable()
export class TimesheetService {
  constructor(
    private readonly staffService: StaffService,
    private readonly overtimeService: OvertimeService,
    private readonly payCodeService: PaycodeService,
    private readonly sanitizer: TimeSheetSanitizer,
  ) {
    this.model = TimeSheetModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<ITimeSheet>;
  private mongooseUtil: MongooseUtil;

  /** Create a new timesheet */
  async create(dto: CreateTimesheetDTO): Promise<TimeSheetDTO> {
    try {
      const staff = await this.staffService.findById(dto.staffId);
      const payCode: PayCodeDTO = await this.payCodeService.findOne(dto.payCode);
      let payTable: IPayTable;
      if (payCode.payCodeTypeId.overtime) {
        payTable = await this.calculateOTs(dto, payCode.rate);
      }
      const regularHours = payTable ? dto.hours - payTable.totalHours : dto.hours;
      const regularPay = regularHours * payCode.rate;
      let timesheet = new this.model({
        staffId: staff._id,
        payCode: payCode.id,
        description: dto.description,
        totalHours: dto.hours,
        startDate: dto.startDate,
        endDate: dto.endDate ? dto.endDate : null,
        totalAmount: payTable ? regularPay + payTable.totalAmount : regularPay,
        regularHours: regularHours,
        regularPay: regularPay,
        overtimes: payTable ? payTable.overtimes : [],
      });
      timesheet = await (await timesheet.save())
        .populate({ path: 'payCode', populate: { path: 'payCodeTypeId' } })
        .execPopulate();
      return this.sanitizer.sanitize(timesheet);
    } catch (e) {
      console.log(e);
      this.mongooseUtil.checkDuplicateKey(e, 'TimeSheet already exists');
      throw e;
    }
  }

  /** Gets a timesheet */
  async findOne(_id: string): Promise<TimeSheetDTO> {
    try {
      const timesheet: any = await this.model.findById(_id).populate({
        path: 'payCode',
        populate: { path: 'payCodeTypeId' },
      });
      this.checkTimeSheet(timesheet);
      return this.sanitizer.sanitize(timesheet);
    } catch (e) {
      throw e;
    }
  }

  /** Gets all timesheets that have @param staffId matching */
  async findAll(staffId: string): Promise<TimeSheetDTO[]> {
    try {
      const timesheet: any = await this.model.find({ staffId }).populate({
        path: 'payCode',
        populate: { path: 'payCodeTypeId' },
      });
      this.checkTimeSheet(timesheet);
      return this.sanitizer.sanitizeMany(timesheet);
    } catch (e) {
      throw e;
    }
  }

  /** Calculates all the overtimes and returns it in a paytable ONLY for overtime */
  private async calculateOTs(dto: CreateTimesheetDTO, rate: number): Promise<IPayTable> {
    const paytable: IPayTable = { totalAmount: 0, totalHours: 0, overtimes: [] };
    let overtimeRules = await this.overtimeService.findAll();
    const [dailyHours, weeklyHours, consecutiveDays] = await Promise.all([
      this.getDailyHours(dto.startDate),
      this.getWeeklyHours(dto.endDate),
      this.getConsecutive(dto.hours, dto.endDate),
    ]);
    let maxMultiplierOT: OvertimeDTO;
    let hours = dto.hours;
    let calculatedOT: ICalculatedOT;
    while (hours > 0 && overtimeRules.length > 0) {
      maxMultiplierOT = this.getMaxMultiplierOT(overtimeRules);
      switch (maxMultiplierOT.type) {
        case OvertimeStatus.DAILY:
          calculatedOT = this.calculateByHours(maxMultiplierOT, hours, dailyHours);
        case OvertimeStatus.WEEKLY:
          calculatedOT = this.calculateByHours(maxMultiplierOT, hours, weeklyHours);
        case OvertimeStatus.CONSECUTIVE:
          calculatedOT = this.calculateByDays(maxMultiplierOT, hours, consecutiveDays);
      }
      hours = calculatedOT.remainder;
      const otAmount = calculatedOT.used * (maxMultiplierOT.multiplier * rate);
      paytable.totalAmount += otAmount;
      paytable.totalHours += calculatedOT.used;
      paytable.overtimes.push({
        id: maxMultiplierOT.id,
        hours: calculatedOT.used,
        amount: otAmount,
      });
      overtimeRules = overtimeRules.filter((rule) => rule.id !== maxMultiplierOT.id);
    }
    return paytable;
  }

  /** Private Methods */
  /** finds the overtime rule with the largest multiplier */
  private getMaxMultiplierOT(overtime: OvertimeDTO[]): OvertimeDTO {
    const maxMultiplier = overtime.reduce(function (prev, curr) {
      if (
        prev.multiplier > curr.multiplier &&
        prev.multiplier == curr.multiplier &&
        prev.threshold > curr.threshold
      ) {
        return prev;
      } else {
        return curr;
      }
    });
    return maxMultiplier;
  }

  /** Calculates and @returns the total number of hours in all timesheets for a given date */
  private async getDailyHours(date): Promise<number> {
    const timesheets = await this.model.find({
      createdDate: {
        $gte: new Date(new Date(date).setHours(0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59)),
      },
    });
    let totalHours;
    for (let i = 0; i < timesheets.length; i++) {
      totalHours += timesheets[i].hours;
    }
    return totalHours;
  }
  /** Calculates and @returns the total number of hours in all timesheets for a week that contains the date*/
  private async getWeeklyHours(endDate): Promise<number> {
    const curr = new Date(endDate); // get current date
    const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    const last = first - 7; // last day is the first day + 6
    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));
    console.log(firstday, 'firstdayyyyyyyy');
    console.log(lastday, 'lastdayyyyyyyyy');
    const timesheets = await this.model.find({
      createdDate: { $gte: lastday, $lte: firstday },
    });
    let totalHours;
    for (let i = 0; i < timesheets.length; i++) {
      totalHours += timesheets[i].hours;
    }
    return totalHours;
  }

  /** Returns an arrya of dates that have at least one timesheet from @param startDate to @param endDate */
  private async getConsecutive(day, endDate): Promise<any> {
    console.log(day, 'dayyyyyy');
    let arr;
    const curr = new Date(endDate);
    const first = curr.getDate() - day;
    const last = curr.getDate() + 1;
    const lastday = new Date(curr.setDate(last));
    const firstday = new Date(curr.setDate(first));
    console.log(lastday, 'lastday CONSECUTIVE');
    console.log(firstday, 'firstday CONSECUTIVE');
    const timesheets = await this.model
      .find({
        createdDate: { $gte: firstday, $lte: lastday },
      })
      .sort({ createdDate: -1 })
      .select('createdDate');
    arr = timesheets;
    console.log(arr, 'arrr Timesheets');
    for (let j = 0; j < arr.length - 1; j++) {
      let date = new Date(arr[j].createdDate);
      let nextDate = new Date(arr[j + 1].createdDate);
      if (date.getDay() == nextDate.getDay()) {
        arr.splice(j, 1);
      }
    }
    console.log('last Arr', arr, 'day', day);
    return arr.length < day;
  }

  /** Calculates the number of hours to be used and what remains given the ot rules threshold, previous hours and current timesheet hours */
  private calculateByHours(ot: OvertimeDTO, hours: number, prevTotals: number): ICalculatedOT {
    const response: ICalculatedOT = {
      remainder: hours,
      used: 0,
    };
    if (prevTotals >= ot.threshold) {
      // we use all hours as overtime
      response.remainder = 0;
      response.used = hours;
    } else {
      // need to determine if we will use some hours for ot
      const diff = ot.threshold - prevTotals;
      if (diff < hours) {
        // need to use some hours for OT
        response.remainder = diff;
        response.used = hours - diff;
      }
    }
    return response;
  }

  /** Determines if the current consecutive overtime rule should be used. The function either uses all hours or none, since the mode is consecutive */
  private calculateByDays(ot: OvertimeDTO, hours: number, dates: string[]): ICalculatedOT {
    let matchesRule = false;
    //TODO: Write the matching logic
    if (matchesRule) {
      return { remainder: 0, used: hours }; // rule matched: use all hours for this overtime
    } else {
      return { remainder: hours, used: 0 }; //did not use the hours
    }
  }
  
  /** if the timesheet is not valid, throws an exception */
  private checkTimeSheet(timesheet: ITimeSheet) {
    if (!timesheet) {
      throw new HttpException('timesheet with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
}

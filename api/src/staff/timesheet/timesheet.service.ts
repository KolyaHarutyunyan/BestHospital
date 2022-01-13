import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PayCodeDTO } from 'src/employment/paycode/dto';
import { OvertimeDTO } from 'src/overtime/dto';
import { OvertimeStatus } from 'src/overtime/overtime.constants';
import { PayCodeTypeDTO } from 'src/paycodetype/dto';
import { PaycodeService } from '../../employment/paycode/paycode.service';
import { OvertimeService } from '../../overtime/overtime.service';
import { MongooseUtil } from '../../util';
import { StaffService } from '../staff.service';
import { CreateTimesheetDTO, EditTimesheetDTO, TimeSheetDTO } from './dto';
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
      const payCodeType = payCode.payCodeTypeId as PayCodeTypeDTO;
      if (payCodeType.overtime) {
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
        hours: dto.hours,
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

  /** Update the timesheet */
  async update(_id: string, dto: EditTimesheetDTO): Promise<any> {
    try {
      const timesheet = await this.model.findById(_id);
      this.checkTimeSheet(timesheet);
      const payCode: PayCodeDTO = await this.payCodeService.findOne(dto.payCode);
      let payTable: IPayTable;
      const payCodeType = payCode.payCodeTypeId as PayCodeTypeDTO;
      if (payCodeType.overtime) {
        dto.staffId = timesheet.staffId;
        payTable = await this.calculateOTs(dto, payCode.rate);
      }
      const regularHours = payTable ? dto.hours - payTable.totalHours : dto.hours;
      const regularPay = regularHours * payCode.rate;
      timesheet.totalAmount = payTable ? regularPay + payTable.totalAmount : regularPay;
      timesheet.regularHours = regularHours;
      timesheet.regularPay = regularPay;
      timesheet.overtimes = payTable ? payTable.overtimes : [];
      timesheet.description = dto.description;
      timesheet.hours = dto.hours;
      timesheet.startDate = dto.startDate;
      dto.endDate ? (timesheet.endDate = dto.endDate) : (timesheet.endDate = null);
      return await timesheet.save();
      // return this.sanitizer.sanitizeMany(timesheet);
    } catch (e) {
      throw e;
    }
  }

  /** Private Methods */
  /** Calculates all the overtimes and returns it in a paytable ONLY for overtime */
  private async calculateOTs(dto: CreateTimesheetDTO, rate: number): Promise<IPayTable> {
    const paytable: IPayTable = { totalAmount: 0, totalHours: 0, overtimes: [] };
    let overtimeRules = await this.overtimeService.findAll();
    const consecutiveMaxDays = this.getMaxDays(overtimeRules);
    const [dailyHours, weeklyHours, consecutiveDays] = await Promise.all([
      this.getDailyHours(dto.startDate),
      this.getWeeklyHours(dto.startDate),
      this.getConsecutive(dto.startDate, consecutiveMaxDays),
    ]);
    let maxMultiplierOT: OvertimeDTO;
    let hours = dto.hours;
    let calculatedOT: ICalculatedOT;
    while (hours > 0 && overtimeRules.length > 0) {
      maxMultiplierOT = this.getMaxMultiplierOT(overtimeRules);
      switch (maxMultiplierOT.type) {
        case OvertimeStatus.DAILY:
          calculatedOT = this.calculateByHours(maxMultiplierOT, hours, dailyHours);
          console.log(calculatedOT, 'calculatedOT Day');
          break;
        case OvertimeStatus.WEEKLY:
          calculatedOT = this.calculateByHours(maxMultiplierOT, hours, weeklyHours);
          console.log(calculatedOT, 'calculatedOT Week');
          break;
        case OvertimeStatus.CONSECUTIVE:
          const startDate = new Date(dto.startDate);
          calculatedOT = this.calculateByDays(maxMultiplierOT, hours, startDate, consecutiveDays);
          console.log(calculatedOT, 'calculatedOT Consecutive');
          break;
      }
      hours = calculatedOT.remainder;
      if (calculatedOT.used === 0) {
        overtimeRules = overtimeRules.filter((rule) => rule.id !== maxMultiplierOT.id);
        continue;
      }
      const otAmount = calculatedOT.used * (maxMultiplierOT.multiplier * rate);
      paytable.totalAmount += otAmount;
      paytable.totalHours += calculatedOT.used;
      paytable.overtimes.push({
        id: maxMultiplierOT.id,
        hours: calculatedOT.used,
        amount: otAmount,
        rateType: maxMultiplierOT.type,
        name: maxMultiplierOT.name,
      });
      overtimeRules = overtimeRules.filter((rule) => rule.id !== maxMultiplierOT.id);
    }

    return paytable;
  }

  /** finds the overtime rule with the largest multiplier */
  private getMaxMultiplierOT(overtime: OvertimeDTO[]): OvertimeDTO {
    const maxMultiplier = overtime.reduce(function (prev, curr) {
      if (
        prev.multiplier > curr.multiplier ||
        (prev.multiplier == curr.multiplier && prev.threshold > curr.threshold)
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
      startDate: {
        $gte: new Date(new Date(date).setHours(0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59)),
      },
    });
    if (!timesheets.length) return 0;
    let totalHours = 0;
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
    const timesheets = await this.model.find({
      startDate: { $gte: lastday, $lte: firstday },
    });
    if (!timesheets.length) return 0;

    let totalHours = 0;
    for (let i = 0; i < timesheets.length; i++) {
      totalHours += timesheets[i].hours;
    }
    return totalHours;
  }

  /** Returns an arrya of dates that have at least one timesheet from @param startDate to @param endDate */
  private async getConsecutive(date, daysToGoBack): Promise<Date[]> {
    const timeSheetDate = new Date(date);
    const first = timeSheetDate.getDate() - daysToGoBack;
    const last = timeSheetDate.getDate();
    const lastday = new Date(timeSheetDate.setDate(last));
    const firstday = new Date(timeSheetDate.setDate(first));
    const timesheets = await this.model
      .find({
        startDate: { $gte: firstday, $lte: lastday },
      })
      .sort({ startDate: -1 })
      .select('startDate');
    const uniqueDates = [];
    if (!timesheets.length) return uniqueDates;
    uniqueDates.push(new Date(timesheets[0].startDate));
    for (let j = 1; j < timesheets.length; j++) {
      const prevDate = new Date(timesheets[j - 1].startDate);
      const currDate = new Date(timesheets[j].startDate);
      if (prevDate.getDay() != currDate.getDay()) {
        uniqueDates.push(new Date(timesheets[j].startDate));
      }
    }
    return uniqueDates;
  }
  /** Get the maximum conseq days */
  private getMaxDays(overtimes: OvertimeDTO[]): number {
    let max = 0;
    for (let i = 0; i < overtimes.length; i++) {
      if (overtimes[i].type === OvertimeStatus.CONSECUTIVE) {
        if (overtimes[i].threshold > max) max = overtimes[i].threshold;
      }
    }
    return max;
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
  private calculateByDays(
    ot: OvertimeDTO,
    hours: number,
    startDate: Date,
    dates: Date[],
  ): ICalculatedOT {
    let matchesRule = true;
    let currDate = new Date(startDate),
      index;
    for (let i = 1; i <= ot.threshold; i++) {
      currDate = new Date(currDate.setDate(startDate.getDate() - i));
      index = dates.findIndex((date) => date.getDate() === currDate.getDate());
      console.log(index);
      if (index < 0) {
        matchesRule = false;
        break;
      }
    }
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

/**
 * { maxMult: 5, thresh: 3, type: CONSECUTIVE}
 * { maxMult: 2, thresh: 4, type: CONSECUTIVE}
 * { maxMult: 4, thresh: 6, type: CONSECUTIVE}
 *
 *  [01/01/2020, 02/01/2020, 03/01/2021, 05/01/2020]
 */

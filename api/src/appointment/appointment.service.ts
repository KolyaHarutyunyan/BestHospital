import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as cron from 'node-cron';
import { AuthorizationserviceService } from '../client/authorizationservice/authorizationservice.service';
import { ClientService } from '../client/client.service';
import { PaycodeService } from '../employment/paycode/paycode.service';
import { StaffService } from '../staff/staff.service';
import { MongooseUtil } from '../util/mongoose.util';
import { AppointmentModel } from './appointment.model';
import { AppointmentDto, CreateAppointmentDto, CreateRepeatDto, UpdateAppointmentDto } from './dto';
import { AppointmentSanitizer } from './interceptor/appointment.interceptor';
import { IAppointment } from './interface';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly clientService: ClientService,
    private readonly authorizedService: AuthorizationserviceService,
    private readonly staffService: StaffService,
    private readonly payCodeService: PaycodeService,
    private readonly sanitizer: AppointmentSanitizer
  ) {
    this.model = AppointmentModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IAppointment>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreateAppointmentDto): Promise<AppointmentDto> {
    const staff = await this.staffService.findById(dto.staff);
    const staffPayCode: any = await this.payCodeService.findOne(dto.staffPayCode);
    if (dto.type == "SERVICE") {
      if (!dto.client || !dto.authorizedService) {
        throw new HttpException(
          `Client or Client Authorization can not not be empty`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const client = await this.clientService.findById(dto.client);
      const authService: any = await this.authorizedService.getClient(dto.authorizedService);
      if (client.id != authService.authorizationId.clientId) {
        throw new HttpException(
          'Authorization Service is not Client authorization service',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (staff.id != staffPayCode.employmentId.staffId) {
      throw new HttpException(
        'PayCode is not staff pay code',
        HttpStatus.BAD_REQUEST,
      );
    }
    let appointment = new this.model({
      client: dto.client,
      authorizedService: dto.authorizedService,
      staff: dto.staff,
      staffPayCode: dto.staffPayCode,
      startDate: dto.startDate,
      startTime: dto.startTime,
      endTime: dto.endTime,
      status: dto.status,
      require: dto.require
    });
    if (dto.type == "DRIVE") {
      if (!dto.miles) {
        throw new HttpException(
          `Miles can not not be empty`,
          HttpStatus.BAD_REQUEST,
        );
      }
      appointment.miles = dto.miles;
    }
    appointment = await appointment.save();
    return this.sanitizer.sanitize(appointment)
  }

  async repeat(dto: CreateRepeatDto): Promise<any> {
    if (dto.mode == 'DAILY') {
      if (!dto.repeatCount && !dto.repeatConsecutive) {
        throw new HttpException(
          `repeatCount or(and) repeatConsecutive can not not be empty`,
          HttpStatus.BAD_REQUEST,
        );
      }
      else if (dto.repeatCount && !dto.repeatConsecutive) {
        console.log('dto.repeatCount && !dto.repeatConsecutive');

        const day = 24 * 60 * 60 * 1000 * dto.repeatCount; // hours*minutes*seconds*milliseconds
        const startDate: any = new Date(dto.startDate);
        const endDateDate: any = new Date(dto.endDate);

        const diffDays = Math.floor(Math.abs((startDate - endDateDate) / day));
        cron.schedule(`0 0 */${dto.repeatCount} * *`, () => {
          console.log('running a task every interval day');
        });

        return diffDays;
      }
      else if (!dto.repeatCount && dto.repeatConsecutive) {
        console.log('!dto.repeatCount && dto.repeatConsecutive');

        const startDate: any = new Date(dto.startDate);
        const endDateDate: any = new Date(dto.endDate);

        const count = this.getBusinessDatesCount(startDate, endDateDate)
        cron.schedule('0 0 * * 1-5', () => {
          console.log('running a task every minute');
        });
        return count;
      }
      //something
    }
    else if (dto.mode == 'WEEKLY') {
      if (!dto.repeatCountWeek && !dto.repeatCheckWeek) {
        throw new HttpException(
          `repeatCountWeek or(and) repeatCheckWeek can not not be empty`,
          HttpStatus.BAD_REQUEST,
        );
      }
      else if (dto.repeatCountWeek && !dto.repeatCheckWeek) {
        console.log('dto.repeatCountWeek && !dto.repeatCheckWeek');
        const diff = this.weeks_between(new Date(dto.startDate), new Date(dto.endDate));
        //////////////////////////////////////////////////////////////////
        cron.schedule(``, () => {
          console.log(`running a task every ${dto.repeatCountWeek}`);
        });
        //////////////////////////////////////////////////////////////////
        return { occurrency: diff }
      }
      else if (!dto.repeatCountWeek && dto.repeatCheckWeek) {
        console.log('!dto.repeatCountWeek && dto.repeatCheckWeek');
        const count = [];
        const week = dto.repeatCheckWeek.toString();

        const startDate: any = new Date(dto.startDate);
        const endDateDate: any = new Date(dto.endDate);

        var dayCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }; //0 is sunday and 6 is saturday
        for (var d = startDate; d <= endDateDate; d.setDate(d.getDate() + 1)) {
          dayCount[d.getDay()]++;
        }

        dto.repeatCheckWeek.map(days => {
          const day = Number(days);
          const obj = {};
          obj[day] = dayCount[days]
          count.push(obj);
        })
        cron.schedule(`0 0 * * */${week}`, () => {
          console.log('running a task every checked day');
        });
        return count
      }
      else if (dto.repeatCountWeek && dto.repeatCheckWeek) {
        console.log('dto.repeatCountWeek && dto.repeatCheckWeek');
        // const week = dto.repeatCheckWeek.toString();
        // cron.schedule(`0 0 * * ${week}`, () => {
        //   console.log('running a task every checked day');
        // });
      }
    }
    else {
      console.log('every month')
      if (!dto.repeatDayMonth && !dto.repeatMonth) {
        console.log('!dto.repeatDayMonth && !dto.repeatMonth');
        // throw new HttpException(
        //   `repeatCountWeek or(and) repeatCheckWeek can not not be empty`,
        //   HttpStatus.BAD_REQUEST,
        // );
      }
      else if (dto.repeatDayMonth && !dto.repeatMonth) {
        console.log('dto.repeatDayMonth && !dto.repeatMonth')

        let start = new Date(dto.startDate);
        let end = new Date(dto.endDate);
        let count = 0;
        let loop = new Date(start);
        while (loop <= end) {
          if (loop.getDate() < dto.repeatDayMonth || start.getMonth() < loop.getMonth()) {
            ++count;
          }
          let newDate = loop.setMonth(loop.getMonth() + 1);
          loop = new Date(newDate);
          if (loop.getMonth() == end.getMonth()) {
            if (end.getDate() < dto.repeatDayMonth) {
              return { occurrency: count }
            }
            return { occurrency: ++count }
          }
        }

        cron.schedule(`0 0 */${dto.repeatDayMonth} * *`, () => {
          console.log('running a task every month by checked day');
        });
        return { occurrency: count }

      }
      else if (!dto.repeatDayMonth && dto.repeatMonth) {
        console.log('!dto.repeatDayMonth && dto.repeatMonth');
        const startDate: any = new Date(dto.startDate);
        const endDate: any = new Date(dto.endDate);
        let months;
        months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
        months -= startDate.getMonth();
        months += endDate.getMonth();
        cron.schedule(`0 0 * */${dto.repeatMonth} *`, () => {
          console.log('running a task every checked month');
        });
        return { occurrency: Math.floor(months / dto.repeatMonth) }
      }
      else if (dto.repeatDayMonth && dto.repeatMonth) {
        console.log('dto.repeatDayMonth && dto.repeatMonth');
        cron.schedule(`0 0 */${dto.repeatDayMonth} */${dto.repeatMonth} *`, () => {
          console.log('running a task every month by checked day');
        });
      }
    }
  }
  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
  // calculate working days between two dates
  getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }
  weeks_between(start: Date, end: Date) {
    // The number of milliseconds in one week
    var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
    // Convert both dates to milliseconds
    var start_ms = start.getTime();
    var end_ms = end.getTime();
    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(start_ms - end_ms);
    // Convert back to weeks and return hole weeks
    return Math.floor(difference_ms / ONE_WEEK);
  }
}

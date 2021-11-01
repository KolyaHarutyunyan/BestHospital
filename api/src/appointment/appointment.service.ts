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

  async repeat(dto: CreateRepeatDto, _id: string): Promise<any> {
    const appointment = await this.model.findById(_id);
    this.checkAppointment(appointment)
    let now = new Date();
    if (dto.startDate > dto.endDate) {
      throw new HttpException(
        `startDate can not be higher than endDate`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (new Date(dto.startDate) < now) {
      dto.startDate = now;
    }
    if (new Date(dto.endDate) < now) {
      dto.endDate = now;
    }
    if (dto.mode == 'DAILY') {
      if (!dto.repeatCount && !dto.repeatConsecutive) {
        throw new HttpException(
          `repeatCount or(and) repeatConsecutive can not not be empty`,
          HttpStatus.BAD_REQUEST,
        );
      }
      else if (dto.repeatCount && !dto.repeatConsecutive) {
        console.log('dto.repeatCount && !dto.repeatConsecutive');

        const day = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const startDate: any = new Date(dto.startDate).setDate(new Date(dto.startDate).getDate() - 1);
        const endDate: any = new Date(dto.endDate).setDate(new Date(dto.endDate).getDate() + 1);
        const diffDays = Math.floor(Math.abs((startDate - endDate) / day));
        let count = 0;
        if (diffDays % dto.repeatCount == 0) {
          count = Math.floor(diffDays / dto.repeatCount);
        }
        else {
          count = Math.ceil(diffDays / dto.repeatCount);
        }
        for (let i = 0; i < count; i++) {
          this.cloneDoc(appointment);
        }
        // cron.schedule(`0 0 */${dto.repeatCount} * *`, () => {
        //   console.log('running a task every interval day'); 
        // });
        return { occurency: count };
      }
      else if (!dto.repeatCount && dto.repeatConsecutive) {
        console.log('!dto.repeatCount && dto.repeatConsecutive');
        const appointment = await this.model.findById(_id);
        const startDate: any = new Date(dto.startDate);
        const endDateDate: any = new Date(dto.endDate);

        const count = this.getBusinessDatesCount(startDate, endDateDate);
        for (let i = 0; i < count; i++) {
          this.cloneDoc(appointment);
        }
        // cron.schedule('0 0 * * 1-5', () => {
        //   console.log('running a task every weekdays');
        // });
        return { occurency: count };
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
        // console.log(`${dto.repeatCountWeek} && !dto.repeatCheckWeek`);
        // const day = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        // const startDate: any = new Date(dto.startDate).setDate(new Date(dto.startDate).getDate() - 1);
        // const endDate: any = new Date(dto.endDate).setDate(new Date(dto.endDate).getDate() + 1);
        // const diffWeek = Math.floor(Math.abs((startDate - endDate) / day));
        
        // return { occurrency: diffWeek }
      }
      else if (!dto.repeatCountWeek && dto.repeatCheckWeek) {
        console.log('!dto.repeatCountWeek && dto.repeatCheckWeek');
        const weeks = [];
        let totalCount = 0;
        const week = dto.repeatCheckWeek.toString();

        const startDate: any = new Date(dto.startDate);
        const endDate: any = new Date(dto.endDate);

        var dayCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }; //0 is sunday and 6 is saturday
        for (var d = startDate; d <= endDate; d.setDate(d.getDate())) {
          console.log(startDate)
          console.log(d)

          dayCount[d.getDay()]++;
           d = new Date(d.getTime() + 21 * 24 * 60 * 60 * 1000);

          // d.setDate(d.getDate() + 1)
        }
        console.log(dayCount)
        dto.repeatCheckWeek.map(days => {
          const day = Number(days);
          const obj = {};
          obj[day] = dayCount[days]
          weeks.push(obj);
          totalCount += dayCount[days]
        })
        for (let i = 0; i < totalCount; i++) {
          this.cloneDoc(appointment)
        }
        return totalCount;
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
          if (loop.getDate() < dto.repeatDayMonth || start.getMonth() <= loop.getMonth()) {
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

        // this.everyMinute()
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

  /** Private methods */
  /** if the appointment is not found, throws an exception */
  private checkAppointment(appointment: IAppointment) {
    if (!appointment) {
      throw new HttpException(
        'Appointment with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }


async cloneDoc(appointment: IAppointment) {
  const cloneDoc = new this.model({
    client: appointment.client,
    authorizedService: appointment.authorizedService,
    isRepeat: true,
    miles: appointment.miles,
    staff: appointment.staff,
    staffPayCode: appointment.staffPayCode,
    startDate: appointment.startDate,
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    status: appointment.status,
    require: appointment.require
  });
  return await cloneDoc.save();
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
// cron operation
everyMinute() {
  let task = cron.schedule('* * * * *', () => {
    console.log('stopped task');
  }, {
    scheduled: false
  });
  task.start()
  if (new Date() == new Date('Sun Oct 31 2021 13:13:33 GMT+0400')) {
    task.stop()
  }
}
}

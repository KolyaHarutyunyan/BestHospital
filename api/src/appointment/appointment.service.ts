import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthorizationserviceService } from '../client/authorizationservice/authorizationservice.service';
import { ClientService } from '../client/client.service';
import { PaycodeService } from '../employment/paycode/paycode.service';
import { StaffService } from '../staff/staff.service';
import { EventStatus } from './appointment.constants';
import { AppointmentModel } from './appointment.model';
import {
  AppointmentDto, CreateAppointmentDto,
  CreateRepeatDto, UpdateAppointmentDto
} from './dto';
import { AppointmentQueryDTO } from './dto/appointment.dto';
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
  }
  private model: Model<IAppointment>;

  // create Appointment
  async create(dto: CreateAppointmentDto): Promise<AppointmentDto> {
    const [overlappingSatff, overlappingClient] = await Promise.all([
      this.model.find({ staff: dto.staff, "startTime": { "$lt": new Date(dto.endTime) }, "endTime": { "$gt": new Date(dto.startDate) } }),
      this.model.find({ client: dto.client, "startTime": { "$lt": new Date(dto.endTime) }, "endTime": { "$gt": new Date(dto.startDate) } })
    ]);

    if (overlappingSatff[0] || overlappingClient[0]) {
      throw new HttpException(
        `appointment overlapping`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const [staff, client, staffPayCode]: any = await Promise.all([
      this.staffService.findById(dto.staff),
      this.clientService.findById(dto.client),
      this.payCodeService.findOne(dto.staffPayCode)
    ]);

    if (dto.type == "SERVICE") {
      if (!dto.client || !dto.authorizedService) {
        throw new HttpException(
          `Client or Client Authorization can not not be empty`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const authService: any = await this.authorizedService.getClient(dto.authorizedService);
      const compareService = await this.authorizedService.checkByServiceId(authService.serviceId);
      if (staff.service.indexOf(compareService.serviceId) == -1) {
        throw new HttpException(
          'Staff service have not current service',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (client.id != authService.authorizationId.clientId) {
        throw new HttpException(
          'Authorization Service is not Client authorization service',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (dto.require && !dto.files) {
        throw new HttpException(
          'Files should not be empty',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (staff.id != staffPayCode.employmentId.staffId && staffPayCode.employmentId.active != true) {
      throw new HttpException(
        'PayCode is not staff pay code or employment is not active',
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
      eventStatus: dto.eventStatus,
      status: dto.status,
      require: dto.require,
      type: dto.type,
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

  // repeat an appointments
  async repeat(dto: CreateRepeatDto, _id: string): Promise<Object> {
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
        return await this.repeatDaily(dto, appointment)
      }
      else if (!dto.repeatCount && dto.repeatConsecutive) {
        return await this.repeatConsecutiveDays(dto, appointment);
      }
    }
    else if (dto.mode == 'WEEKLY') {
      if (!dto.repeatCountWeek && !dto.repeatCheckWeek
        || dto.repeatCountWeek && !dto.repeatCheckWeek
        || !dto.repeatCountWeek && dto.repeatCheckWeek) {
        throw new HttpException(
          `repeatCountWeek or(and) repeatCheckWeek can not not be empty`,
          HttpStatus.BAD_REQUEST,
        );
      }
      else if (dto.repeatCountWeek && dto.repeatCheckWeek) {
        return await this.repeatWeekly(dto, appointment);
      }
    }
    else {
      if (!dto.repeatDayMonth && !dto.repeatMonth
        || !dto.repeatDayMonth && dto.repeatMonth
        || dto.repeatDayMonth && !dto.repeatMonth) {
        throw new HttpException(
          `repeatDayMonth or(and) repeatMonth can not not be empty`,
          HttpStatus.BAD_REQUEST,
        );
      }
      else if (dto.repeatDayMonth && dto.repeatMonth) {
        return await this.repeatMonthly(dto, appointment);
      }
    }
  }

  // repeat with interval days
  async repeatDaily(dto: CreateRepeatDto, appointment: IAppointment): Promise<Object> {
    console.log('dto.repeatCount && !dto.repeatConsecutive');
    const appointments = [];
    const day = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate: any = new Date(dto.startDate);
    const endDate: any = new Date(new Date(dto.endDate).setHours(23, 59, 59));
    const diffDays = Math.floor(Math.abs((startDate - endDate) / day));
    let count = 0;
    let dates = [], x;
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + dto.repeatCount + 1)) {
      count++;
      x = new Date(d.getTime());
      dates.push(x)
    }
    for (let i = 0; i < count; i++) {
      this.cloneDoc(appointment, dates[i], appointments);
    }
    await this.saveDb(appointments);
    return { occurency: count };
  }

  // repeat every day
  async repeatConsecutiveDays(dto: CreateRepeatDto, appointment: IAppointment): Promise<Object> {
    const appointments = [];
    const startDate: any = new Date(dto.startDate);
    const endDateDate: any = new Date(dto.endDate);
    const days = this.getBusinessDatesCount(startDate, endDateDate);
    for (let i = 0; i < days.count; i++) {
      this.cloneDoc(appointment, days.dates[i], appointments);
    }
    await this.saveDb(appointments);
    return { occurency: days.count };
  }

  // repeat every week
  async repeatWeekly(dto: CreateRepeatDto, appointment: IAppointment): Promise<Object> {
    const appointments = [];
    const weeks = [];
    let totalCount = 0;
    const startDate: any = new Date(dto.startDate);
    const endDate: any = new Date(dto.endDate);
    let current = true;
    let dates = [], x;
    var dayCount = {
      0: { sum: 0, date: [] }, 1: { sum: 0, date: [] }, 2: { sum: 0, date: [] },
      3: { sum: 0, date: [] }, 4: { sum: 0, date: [] }, 5: { sum: 0, date: [] },
      6: { sum: 0, date: [] }
    }; //0 is sunday and 6 is saturday
    for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dayCount[d.getDay()].sum++;
      x = new Date(d.getTime());
      dayCount[d.getDay()].date.push(x);
      if (d.getDay() == 5) current = true;
      if (d.getDay() == 0 && current) {
        d.setDate(d.getDate() + (7 * dto.repeatCountWeek));
        current = false;
      }
    }
    dto.repeatCheckWeek.map(days => {
      const day = Number(days);
      const obj = {};
      obj[day] = dayCount[days]
      weeks.push(obj[day].date);
      totalCount += dayCount[days].sum
    })

    for (let prop of weeks) {
      prop.map(date => {
        dates.push(date)
      })
    }
    for (let i = 0; i < totalCount; i++) {
      this.cloneDoc(appointment, dates[i], appointments)
    }
    await this.saveDb(appointments)
    return { occurency: totalCount };
  }

  // repeat every month
  async repeatMonthly(dto: CreateRepeatDto, appointment: IAppointment): Promise<Object> {
    const appointments = [];
    let start = new Date(dto.startDate);
    let end = new Date(dto.endDate);
    let count = 0;
    let dates = [], x;
    for (let d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
      if (d.getMonth() == end.getMonth() && end.getDate() < dto.repeatDayMonth) {
        break
      }
      x = new Date(d.getTime());
      count++;
      dates.push(x);
      d.setMonth(d.getMonth() + dto.repeatMonth);
    }

    for (let i = 0; i < count; i++) {
      this.cloneDoc(appointment, dates[i], appointments)
    }
    await this.saveDb(appointments)
    return { occurrency: count }
  }

  //set Status(EventStatus)
  async setStatus(_id: string, status: any): Promise<AppointmentDto> {
    const appointment = await this.model.findById(_id);
    this.checkAppointment(appointment);
    if (status.status) appointment.status = status.status;
    if (status.eventStatus) {
      if (status.eventStatus == 'COMPLETED' && appointment.status !== 'ACTIVE') {
        throw new HttpException(
          `EventStatus can't be completed`,
          HttpStatus.BAD_REQUEST,
        );
      }
      appointment.eventStatus = status.eventStatus;
    };
    await appointment.save();
    return this.sanitizer.sanitize(appointment)
  }

  // find all appointments
  async findAll(filter: AppointmentQueryDTO): Promise<AppointmentDto[]> {
    let query: any = {}
    if (filter.client) query.client = filter.client;
    if (filter.staff) query.staff = filter.staff;
    if (filter.status) query.status = filter.status;
    if (filter.eventStatus) query.eventStatus = filter.eventStatus;
    if (filter.type) query.type = filter.type;
    const appointments = await this.model.find({ ...query }).populate({
      path: 'client',
      select: 'firstName lastName'
    }).populate({
      path: 'staff',
      select: 'firstName lastName'
    });
    this.checkAppointment(appointments[0])

    return this.sanitizer.sanitizeMany(appointments);
  }

  //filter appointments by client
  async findClients(client: string): Promise<AppointmentDto[]> {
    const appointments = await this.model.find({ client }).populate({
      path: 'client',
      select: 'firstName lastName'
    });
    this.checkAppointment(appointments[0])
    return this.sanitizer.sanitizeMany(appointments);
  }

  //filter appointments by staff
  async findStaff(staff: string): Promise<AppointmentDto[]> {
    const appointments = await this.model.find({ staff }).populate({
      path: 'staff',
      select: 'firstName lastName'
    });
    this.checkAppointment(appointments[0])
    return this.sanitizer.sanitizeMany(appointments);
  }

  // find appointment
  async findOne(_id: string): Promise<AppointmentDto> {
    const appointment = await this.model.findById(_id).populate('client').
      populate('authorizedService').populate('staff').populate('staffPayCode');
    this.checkAppointment(appointment)
    return this.sanitizer.sanitize(appointment);
  }

  // update appointment
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  // remove appointment
  async remove(id: number) {
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

  // clone appointment
  async cloneDoc(appointment: IAppointment, date, appointments: Array<Object>) {
    const cloneDoc = new this.model({
      client: appointment.client,
      authorizedService: appointment.authorizedService,
      type: appointment.type,
      isRepeat: true,
      miles: appointment.miles,
      staff: appointment.staff,
      staffPayCode: appointment.staffPayCode,
      startDate: date,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      eventStatus: EventStatus.NOTRENDERED,
      status: appointment.status,
      require: appointment.require
    });
    appointments.push(cloneDoc);
  }

  // save the appointments
  async saveDb(appointments: Array<Object>) {
    return await this.model.insertMany(appointments);
  }

  // calculate working days between two dates
  getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    let dates = [], x;
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        x = new Date(curDate.getTime());
        dates.push(x)
        count++
      };
      curDate.setDate(curDate.getDate() + 1);
    }
    return { count, dates };
  }
}

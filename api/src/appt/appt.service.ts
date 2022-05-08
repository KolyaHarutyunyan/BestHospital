import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { FileDTO } from '../files/dto';
import { BillingService } from '../billing/billing.service';
import { AuthorizationserviceService } from '../client/authorizationservice/authorizationservice.service';
import { ClientService } from '../client/client.service';
import { EmploymentService } from '../employment/employment.service';
import { PaycodeService } from '../employment/paycode/paycode.service';
import { PlaceService } from '../place/place.service';
import { StaffService } from '../staff/staff.service';
import { ApptMode, ApptStatus, ApptType, EventStatus } from './appt.constants';
import { ApptModel } from './appt.model';
import { ApptDto, CreateApptDto, CreateRepeatDto, UpdateAppointmentDto } from './dto';
import { AppointmentQueryDTO, AppointmentQuerySetEventStatusDTO } from './dto/appt.dto';
import { ApptSanitizer } from './intcp/appt.intcp';
import { IAppt } from './interface';
import { IRepeat } from './interface/appt.interface';

@Injectable()
export class ApptService {
  constructor(
    private readonly clientService: ClientService,
    private readonly authorizedService: AuthorizationserviceService,
    private readonly staffService: StaffService,
    private readonly payCodeService: PaycodeService,
    private readonly employmentService: EmploymentService,
    private readonly placeService: PlaceService,
    private readonly billingService: BillingService,
    private readonly sanitizer: ApptSanitizer,
  ) {
    this.model = ApptModel;
  }
  private model: Model<IAppt>;

  /** create the appt */
  async create(dto: CreateApptDto): Promise<ApptDto> {
    if (new Date(dto.startTime) > new Date(dto.endTime)) {
      throw new HttpException(`startTime can't be high then endTime`, HttpStatus.BAD_REQUEST);
    }
    let appt;
    const [staff, staffPayCode]: any = await Promise.all([
      this.staffService.findById(dto.staff),
      this.payCodeService.findOne(dto.staffPayCode),
    ]);
    switch (dto.type) {
      case ApptType.SERVICE:
        appt = await this.apptService(dto);
        break;
      case ApptType.DRIVE:
        appt = await this.apptDrive(dto);
        break;
      case ApptType.PAID:
        appt = await this.apptPaid(dto);
        break;
      case ApptType.BREAK:
        appt = await this.apptBreak(dto);
        break;
    }
    if (staff.id != staffPayCode.employmentId.staffId) {
      throw new HttpException('PayCode is not staff pay code', HttpStatus.BAD_REQUEST);
    }
    if (staffPayCode.employmentId.active != true) {
      throw new HttpException('Employment is not active', HttpStatus.BAD_REQUEST);
    }
    await appt.save();
    return this.sanitizer.sanitize(appt);
  }

  /** repeat the appt */
  async repeat(dto: CreateRepeatDto, _id: string): Promise<IRepeat> {
    const appt = await this.model.findById(_id);
    this.checkAppt(appt);
    this.canRepeat(appt.isRepeat);
    this.adjustRepeatingDates(dto.startDate, dto.endDate);
    switch (dto.mode) {
      case ApptMode.DAILY:
        return await this.checkDailyMode(dto, appt, dto.repeatCount, dto.repeatConsecutive);
      case ApptMode.WEEKLY:
        this.checkWeeklyMode(dto.repeatCountWeek, dto.repeatCheckWeek);
        if (dto.repeatCountWeek && dto.repeatCheckWeek) {
          return await this.repeatWeekly(dto, appt);
        }
        break;
      case ApptMode.MONTHLY:
        this.checkMonthMode(dto.repeatDayMonth, dto.repeatMonth);
        if (dto.repeatDayMonth && dto.repeatMonth) {
          return await this.repeatMonthly(dto, appt);
        }
        break;
    }
  }

  /** create appt service */
  async apptService(dto: CreateApptDto): Promise<ApptDto> {
    await this.checkClientStaffOverlap(null, dto);
    /** if appointment type is SERVICE client and authorization service are required */
    this.checkClient(dto.client);
    this.checkAuthorizedService(dto.authorizedService);
    this.checkPlaceService(dto.placeService);

    const place = await this.placeService.findOne(dto.placeService);
    const placeId = place._id as string;
    const [client, authService]: any = await Promise.all([
      this.clientService.findById(dto.client),
      this.authorizedService.findById(dto.authorizedService),
    ]);
    /** check if client and authorization client are same */
    if (client.id != authService.authorizationId.clientId) {
      throw new HttpException(
        `Client and authorization client are different`,
        HttpStatus.BAD_REQUEST,
      );
    }
    // const compareService = await this.authorizedService.getByServiceId(authService.serviceId);
    // console.log(staff, 'stafffffff')
    // if (staff.service.indexOf(compareService.serviceId) == -1) {
    //   throw new HttpException(
    //     'Staff service have not current service',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // if (dto.require && !dto.files) {
    //   throw new HttpException(
    //     'Files should not be empty',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    const appt = new this.model({
      client: dto.client,
      authorizedService: dto.authorizedService,
      payer: authService.authorizationId.funderId,
      staff: dto.staff,
      staffPayCode: dto.staffPayCode,
      startDate: new Date(dto.startDate).setHours(23, 59),
      startTime: dto.startTime,
      endTime: dto.endTime,
      eventStatus: dto.eventStatus,
      status: dto.status,
      require: dto.require,
      signature: dto.signature,
      type: dto.type,
      placeService: placeId,
    });
    return appt;
  }

  /** create drive appt */
  async apptDrive(dto): Promise<ApptDto> {
    if (!dto.miles) {
      throw new HttpException(`Miles can not not be empty`, HttpStatus.BAD_REQUEST);
    }
    const appt = new this.model({
      staff: dto.staff,
      staffPayCode: dto.staffPayCode,
      startDate: new Date(dto.startDate).setHours(23, 59),
      startTime: dto.startTime,
      endTime: dto.endTime,
      eventStatus: dto.eventStatus,
      status: dto.status,
      require: dto.require,
      type: dto.type,
      miles: dto.miles,
    });
    return appt;
  }

  /** create paid appt */
  async apptPaid(dto): Promise<ApptDto> {
    const appt = new this.model({
      staff: dto.staff,
      staffPayCode: dto.staffPayCode,
      startDate: new Date(dto.startDate).setHours(23, 59),
      startTime: dto.startTime,
      endTime: dto.endTime,
      eventStatus: dto.eventStatus,
      status: dto.status,
      require: dto.require,
      type: dto.type,
    });
    return appt;
  }

  /** create break appt */
  async apptBreak(dto): Promise<ApptDto> {
    const appt = new this.model({
      staff: dto.staff,
      staffPayCode: dto.staffPayCode,
      startDate: new Date(dto.startDate).setHours(23, 59),
      startTime: dto.startTime,
      endTime: dto.endTime,
      eventStatus: dto.eventStatus,
      status: dto.status,
      require: dto.require,
      type: dto.type,
    });
    return appt;
  }

  /* repeat with interval days */
  async repeatDaily(dto: CreateRepeatDto, appt: IAppt): Promise<IRepeat> {
    console.log('dto.repeatCount && !dto.repeatConsecutive');
    const appts = [];
    const day = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(dto.startDate) as unknown as number;
    const endDate = new Date(new Date(dto.endDate).setHours(23, 59, 59)) as unknown as number;
    Math.floor(Math.abs((startDate - endDate) / day));
    let count = 0;
    const dates = [];
    let x;
    for (let d: any = startDate; d <= endDate; d.setDate(d.getDate() + dto.repeatCount + 1)) {
      count++;
      x = new Date(d.getTime());
      dates.push(x);
    }
    for (let i = 0; i < count; i++) {
      this.cloneDoc(appt, dates[i], appts);
    }
    await this.saveDb(appts);
    return { occurency: count };
  }

  // repeat every day
  async repeatConsecutiveDays(dto: CreateRepeatDto, appt: IAppt): Promise<IRepeat> {
    const appts = [];
    const startDate = new Date(dto.startDate);
    const endDateDate = new Date(dto.endDate);
    const days = this.getBusinessDatesCount(startDate, endDateDate);
    for (let i = 0; i < days.count; i++) {
      this.cloneDoc(appt, days.dates[i], appts);
    }
    await this.saveDb(appts);
    return { occurency: days.count };
  }

  // repeat every week
  async repeatWeekly(dto: CreateRepeatDto, appt: IAppt): Promise<IRepeat> {
    const appts = [];
    const weeks = [];
    let totalCount = 0;
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);
    let current = true;
    const dates = [];
    let x;
    const dayCount = {
      0: { sum: 0, date: [] },
      1: { sum: 0, date: [] },
      2: { sum: 0, date: [] },
      3: { sum: 0, date: [] },
      4: { sum: 0, date: [] },
      5: { sum: 0, date: [] },
      6: { sum: 0, date: [] },
    }; //0 is sunday and 6 is saturday
    for (const d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dayCount[d.getDay()].sum++;
      x = new Date(d.getTime());
      dayCount[d.getDay()].date.push(x);
      if (d.getDay() == 5) current = true;
      if (d.getDay() == 0 && current) {
        d.setDate(d.getDate() + 7 * dto.repeatCountWeek);
        current = false;
      }
    }
    dto.repeatCheckWeek.map((days) => {
      const day = Number(days);
      const obj = {};
      obj[day] = dayCount[days];
      weeks.push(obj[day].date);
      totalCount += dayCount[days].sum;
    });

    for (const prop of weeks) {
      prop.map((date) => {
        dates.push(date);
      });
    }
    for (let i = 0; i < totalCount; i++) {
      this.cloneDoc(appt, dates[i], appts);
    }
    await this.saveDb(appts);
    return { occurency: totalCount };
  }

  // repeat every month
  async repeatMonthly(dto: CreateRepeatDto, appt: IAppt): Promise<IRepeat> {
    const appts = [];
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    let count = 0;
    const dates = [];
    let x;
    for (let d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
      if (d.getMonth() == end.getMonth() && end.getDate() < dto.repeatDayMonth) {
        break;
      }
      x = new Date(d.getTime());
      count++;
      dates.push(x);
      d.setMonth(d.getMonth() + dto.repeatMonth);
    }

    for (let i = 0; i < count; i++) {
      this.cloneDoc(appt, dates[i], appts);
    }
    await this.saveDb(appts);
    return { occurency: count };
  }
  /** render the appointment */
  async render(_id: string): Promise<ApptDto> {
    const appt = await this.model.findById(_id).populate({
      path: 'authorizedService',
      populate: { path: 'serviceId' },
    });
    this.checkAppt(appt);
    this.checkSignature(appt.signature, appt.digitalSignature);
    this.checkStatusAppt(appt.status as ApptStatus);
    this.checkEventStatusAppt(appt.eventStatus as EventStatus, [
      EventStatus.NOTRENDERED,
      EventStatus.PENDING,
    ]);
    this.checkTypeAppt(appt.type as ApptType, [ApptType.SERVICE]);
    await Promise.all([
      this.authorizedService.countCompletedUnits(
        appt.authorizedService,
        this.timeDiffCalc(appt.endTime, appt.startTime),
      ),
      this.billingService.create(appt),
    ]);
    appt.eventStatus = EventStatus.RENDERED;
    await appt.save();
    return this.sanitizer.sanitize(appt);
  }
  /** canclel the appointment */
  async cancel(_id: string, reason: string): Promise<ApptDto> {
    const appt = await this.model.findById(_id);
    this.checkAppt(appt);
    this.checkStatusAppt(appt.status as ApptStatus);
    appt.eventStatus = EventStatus.CANCELLED;
    if (reason) appt.cancelReason = reason;
    await appt.save();
    return this.sanitizer.sanitize(appt);
  }
  //set Status(EventStatus)
  async setStatus(_id: string, status: AppointmentQuerySetEventStatusDTO): Promise<ApptDto> {
    const appointment: any = await this.model.findById(_id).populate({
      path: 'authorizedService',
      populate: { path: 'serviceId' },
    });
    this.checkAppt(appointment);
    if (status.status) appointment.status = status.status;
    if (status.eventStatus) {
      if (status.eventStatus == EventStatus.COMPLETED && appointment.status !== ApptStatus.ACTIVE) {
        throw new HttpException(`EventStatus can't be completed`, HttpStatus.BAD_REQUEST);
      }
      // if (status.eventStatus == 'RENDERED' || !appointment.signature) {
      //   throw new HttpException(
      //     `EventStatus can't be completed without signature`,
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
      if (status.eventStatus === EventStatus.RENDERED && appointment.type !== ApptType.SERVICE) {
        throw new HttpException(`can't render the appointment`, HttpStatus.BAD_REQUEST);
      }
      if (status.eventStatus === EventStatus.RENDERED && appointment.type === ApptType.SERVICE) {
        const minutes = await this.timeDiffCalc(appointment.endTime, appointment.startTime);
        await this.authorizedService.countCompletedUnits(appointment.authorizedService, minutes);
        await this.billingService.create(appointment);
      }
      appointment.eventStatus = status.eventStatus;
    }
    await appointment.save();
    return this.sanitizer.sanitize(appointment);
  }

  /** find all appts */
  async findAll(filter: AppointmentQueryDTO): Promise<IAppt[]> {
    const query: any = {};
    if (filter.client) query.client = mongoose.Types.ObjectId(filter.client);
    if (filter.staff) query.staff = mongoose.Types.ObjectId(filter.staff);
    if (filter.status) query.status = filter.status;
    if (filter.eventStatus) query.eventStatus = filter.eventStatus;
    if (filter.type) query.type = filter.type;
    const appts = await this.model.aggregate([
      { $match: { ...query } },
      { $lookup: { from: 'clients', localField: 'client', foreignField: '_id', as: 'client' } },
      { $lookup: { from: 'staffs', localField: 'staff', foreignField: '_id', as: 'staff' } },
      { $sort: { _id: 1 } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$startDate' } },
          data: { $push: '$$ROOT' },
        },
      },
    ]);
    return appts;
  }

  //filter appointments by client
  async findClients(client: string): Promise<ApptDto[]> {
    const appts = await this.model.find({ client }).populate({
      path: 'client',
      select: 'firstName lastName',
    });
    this.checkAppt(appts[0]);
    return this.sanitizer.sanitizeMany(appts);
  }

  //filter appointments by staff
  async findStaff(staff: string): Promise<ApptDto[]> {
    const appts = await this.model.find({ staff }).populate({
      path: 'staff',
      select: 'firstName lastName',
    });
    this.checkAppt(appts[0]);
    return this.sanitizer.sanitizeMany(appts);
  }

  // find appointment
  async findOne(_id: string): Promise<IAppt> {
    const appt = await this.model
      .findById(_id)
      .populate('client')
      .populate('authorizedService')
      .populate('staff')
      .populate('staffPayCode')
      .populate('placeService');
    const staff = [];
    const client = [];
    staff.push(appt.staff);
    client.push(appt.client);
    this.checkAppt(appt);
    return appt;
    // return this.sanitizer.sanitize(appointment);
  }

  // update appointment
  async update(_id: string, dto: UpdateAppointmentDto): Promise<ApptDto> {
    // the first check if appointment is not complete or cancelled status
    const appointment = await this.model.findById(_id);
    this.checkAppt(appointment);
    await this.checkClientStaffOverlap(_id, dto);
    if (dto.placeService) {
      await this.placeService.findOne(dto.placeService);
      appointment.placeService = dto.placeService;
    }
    if (appointment.type == ApptType.SERVICE) {
      /** if appountment type is SERVICE client and authorization service are required */
      this.checkClient(dto.client);
      this.checkAuthorizedService(dto.authorizedService);
      const [client, authService]: any = await Promise.all([
        this.clientService.findById(dto.client ? dto.client : appointment.client),
        this.authorizedService.findById(
          dto.authorizedService ? dto.authorizedService : appointment.authorizedService,
        ),
      ]);
      /** check if client and authorization client are same */
      if (client.id != authService.authorizationId.clientId) {
        throw new HttpException(
          `Client and authorization client are different`,
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.authorizedService.getByServiceId(authService.serviceId);
    }
    const [, payCode, ,]: any = await Promise.all([
      this.staffService.findById(dto.staff),
      this.payCodeService.findOne(dto.staffPayCode ? dto.staffPayCode : appointment.staffPayCode),
      this.payCodeService.findPayCodesByStaffId(dto.staff ? dto.staff : appointment.staff),
    ]);
    /** check employment status */
    this.employmentService.checkEmploymentActive(payCode.employmentId.active);
    appointment.staff = dto.staff;
    appointment.staffPayCode = dto.staffPayCode;
    // appointment.type = dto.type;
    if (appointment.type == ApptType.DRIVE && dto.miles) {
      appointment.miles = dto.miles;
    }
    if (dto.startDate) appointment.startDate = dto.startDate;
    if (dto.startTime) appointment.startTime = dto.startTime;
    if (dto.endTime) appointment.endTime = dto.endTime;
    if (dto.require) appointment.require = dto.require;
    if (dto.signature) appointment.signature = dto.signature;
    await appointment.save();
    return this.sanitizer.sanitize(appointment);
  }

  // remove appointment
  async remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  /** Private methods */
  /** if the appointment is not found, throws an exception */
  private checkAppt(appt: IAppt) {
    if (!appt) {
      throw new HttpException('Appointment with this id was not found', HttpStatus.NOT_FOUND);
    }
  }

  /** clone the appt */
  async cloneDoc(appt: IAppt, date, appts) {
    const cloneDoc = new this.model({
      client: appt.client,
      authorizedService: appt.authorizedService,
      type: appt.type,
      isRepeat: true,
      miles: appt.miles,
      staff: appt.staff,
      staffPayCode: appt.staffPayCode,
      startDate: new Date(date).setHours(23, 59),
      startTime: appt.startTime,
      endTime: appt.endTime,
      eventStatus: EventStatus.NOTRENDERED,
      status: appt.status,
      require: appt.require,
    });
    appts.push(cloneDoc);
  }

  /** save the appts */
  async saveDb(appts) {
    return await this.model.insertMany(appts);
  }
  // calculate working days between two dates
  getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    const dates = [];
    let x;
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        x = new Date(curDate.getTime());
        dates.push(x);
        count++;
      }
      curDate.setDate(curDate.getDate() + 1);
    }
    return { count, dates };
  }
  // calculate minutes between two dates
  timeDiffCalc(dateFuture, dateNow): number {
    return (Math.abs(dateNow - dateFuture) / 36e5) * 60;
  }
  /** private methods */
  /** check client */
  private checkClient(client: string) {
    if (!client) {
      throw new HttpException('Client with this id was not found', HttpStatus.NOT_FOUND);
    }
  }
  /** can appt have been repeated */
  private canRepeat(repeat: boolean) {
    if (repeat) {
      throw new HttpException(`appointment can not repeat`, HttpStatus.BAD_REQUEST);
    }
  }
  /** check appointment overlapping */
  private async checkClientStaffOverlap(_id: string = null, dto: UpdateAppointmentDto) {
    const [overlappingStaff, overlappingClient] = await Promise.all([
      this.model.find({
        staff: dto.staff,
        startDate: dto.startDate,
        startTime: { $lt: new Date(dto.endTime) },
        endTime: { $gt: new Date(dto.startTime) },
      }),
      this.model.find({
        client: dto.client,
        startDate: dto.startDate,
        startTime: { $lt: new Date(dto.endTime) },
        endTime: { $gt: new Date(dto.startTime) },
      }),
    ]);
    if (overlappingStaff[0] || overlappingClient[0]) {
      if (_id) {
        if (
          overlappingStaff[0]._id.toString() !== _id.toString() &&
          overlappingClient[0]._id.toString() !== _id.toString()
        ) {
          throw new HttpException(`appointment overlapping`, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException(`appointment overlapping`, HttpStatus.BAD_REQUEST);
      }
    }
  }
  /** check authorization service */
  private checkAuthorizedService(authorizedService: string) {
    if (!authorizedService) {
      throw new HttpException(
        'Authorization Service with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /** check place service */
  private checkPlaceService(placeService: string) {
    if (!placeService) {
      throw new HttpException('PlaceService Service was not found', HttpStatus.NOT_FOUND);
    }
  }
  /** check signature */
  private checkSignature(signature: boolean, digitalSignature: FileDTO) {
    if (signature && !digitalSignature) {
      throw new HttpException(`digital signature is required`, HttpStatus.BAD_REQUEST);
    }
  } /** check appt status */
  private checkStatusAppt(appt: ApptStatus) {
    if (appt !== ApptStatus.ACTIVE) {
      throw new HttpException(`Appointment is not active`, HttpStatus.BAD_REQUEST);
    }
  }
  /** Checks if the appt type is allowed (matches an item in allowed types). Throws if no match is found */
  private checkTypeAppt(apptType: ApptType, allowedTypes: ApptType[]) {
    let foundTypeMatch = false;
    for (let i = 0; i < allowedTypes.length; i++) {
      if (apptType === allowedTypes[i]) {
        foundTypeMatch = true;
        break;
      }
    }
    if (!foundTypeMatch) {
      throw new HttpException(
        `You can only edit appointment that are ${allowedTypes}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /** Checks if the appt event status is allowed (matches an item in allowed status). Throws if no match is found */
  private checkEventStatusAppt(eventStatus: EventStatus, allowedStatus: EventStatus[]) {
    let foundStatusMatch = false;
    for (let i = 0; i < allowedStatus.length; i++) {
      if (eventStatus === allowedStatus[i]) {
        foundStatusMatch = true;
        break;
      }
    }
    if (!foundStatusMatch) {
      throw new HttpException(
        `You can only edit appointment that are ${allowedStatus}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /** check dates and adjust */
  private adjustRepeatingDates(startDate: Date, endDate: Date): void {
    const now = new Date();
    if (startDate > endDate) {
      throw new HttpException(`startDate can not be higher than endDate`, HttpStatus.BAD_REQUEST);
    }
    if (new Date(startDate) < now) {
      startDate = now;
    }
    if (new Date(endDate) < now) {
      endDate = now;
    }
  }
  /** check dates in daily mode */
  private async checkDailyMode(dto, appointment, repeatCount, repeatConsecutive): Promise<IRepeat> {
    if (!repeatCount && !repeatConsecutive) {
      throw new HttpException(
        `repeatCount or(and) repeatConsecutive can not not be empty`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (repeatCount && !repeatConsecutive) {
      return await this.repeatDaily(dto, appointment);
    } else if (!repeatCount && repeatConsecutive) {
      return await this.repeatConsecutiveDays(dto, appointment);
    }
  }
  /** check dates in weekly mode */
  private checkWeeklyMode(repeatCountWeek, repeatCheckWeek): void {
    if (
      (!repeatCountWeek && !repeatCheckWeek) ||
      (repeatCountWeek && !repeatCheckWeek) ||
      (!repeatCountWeek && repeatCheckWeek)
    ) {
      throw new HttpException(
        `repeatCountWeek or(and) repeatCheckWeek can not not be empty`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private checkMonthMode(repeatDayMonth, repeatMonth): void {
    if (
      (!repeatDayMonth && !repeatMonth) ||
      (!repeatDayMonth && repeatMonth) ||
      (repeatDayMonth && !repeatMonth)
    ) {
      throw new HttpException(
        `repeatDayMonth or(and) repeatMonth can not not be empty`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

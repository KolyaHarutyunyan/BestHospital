import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IAppointment } from '../interface';
import { AppointmentDto } from '../dto';

@Injectable()
export class AppointmentSanitizer implements ISanitize {
  sanitize(appointment: IAppointment): AppointmentDto {
    const appointmentDTO: AppointmentDto = {
      _id: appointment.id,
      type: appointment.type,
      client: appointment.client,
      funder: appointment.funder,
      authorizedService: appointment.authorizedService,
      staff: appointment.staff,
      staffPayCode: appointment.staffPayCode,
      eventStatus: appointment.eventStatus,
      status: appointment.status,
      require: appointment.require,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      startDate: appointment.startDate,
      miles: appointment.miles,
      address: appointment.address,
      signature: appointment.signature,
      placeService: appointment.placeService,
    };
    return appointmentDTO;
  }
  sanitizeMany(appointments: IAppointment[]): AppointmentDto[] {
    const appointmentDTOs: AppointmentDto[] = [];
    for (let i = 0; i < appointments.length; i++) {
      appointmentDTOs.push(this.sanitize(appointments[i]));
    }
    return appointmentDTOs;
  }
}

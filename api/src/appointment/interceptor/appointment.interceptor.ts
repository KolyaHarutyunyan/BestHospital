import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IAppointment } from '../interface';
import { AppointmentDto } from '../dto'
import { PayCodeSanitizer } from '../../employment/paycode/interceptor/sanitizer.interceptor';
import { StaffSanitizer } from '../../staff/interceptor';
import { AuthorizationServiceSanitizer } from '../../client/authorizationservice/interceptor/authorizationService.interceptor';
import { ClientSanitizer } from '../../client/interceptor';

@Injectable()
export class AppointmentSanitizer implements ISanitize {
    constructor(
        // private readonly clientSanitizer: ClientSanitizer,
        // private readonly authorizeSanitizer: AuthorizationServiceSanitizer,
        // private readonly staffSanitizer: StaffSanitizer,
        // private readonly payCodeSanitizer: PayCodeSanitizer

    ) { }

    sanitize(appointment: IAppointment): AppointmentDto {
        const appointmentDTO: AppointmentDto = {
            id: appointment.id,
            type: appointment.type,
            client: appointment.client,
            authorizedService: appointment.authorizedService,
            staff: appointment.staff,
            staffPayCode: appointment.staffPayCode,
            status: appointment.status,
            require: appointment.require,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            startDate: appointment.startDate,
            miles: appointment.miles,
            address: appointment.address
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
import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../util';
import { IAppt } from '../interface';
import { ApptDto } from '../dto';

@Injectable()
export class ApptSanitizer implements ISanitize {
  sanitize(appt: IAppt): ApptDto {
    const apptDTO: ApptDto = {
      _id: appt.id,
      type: appt.type,
      client: appt.client,
      funder: appt.funder,
      authorizedService: appt.authorizedService,
      staff: appt.staff,
      staffPayCode: appt.staffPayCode,
      eventStatus: appt.eventStatus,
      cancelReason: appt.cancelReason,
      status: appt.status,
      require: appt.require,
      startTime: appt.startTime,
      endTime: appt.endTime,
      startDate: appt.startDate,
      miles: appt.miles,
      address: appt.address,
      signature: appt.signature,
      placeService: appt.placeService,
      digitalSignature: appt.digitalSignature,
    };
    return apptDTO;
  }
  sanitizeMany(appts: IAppt[]): ApptDto[] {
    const appttDTOs: ApptDto[] = [];
    for (let i = 0; i < appts.length; i++) {
      appttDTOs.push(this.sanitize(appts[i]));
    }
    return appttDTOs;
  }
}

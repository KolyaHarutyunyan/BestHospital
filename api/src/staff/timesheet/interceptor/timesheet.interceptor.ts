import { Injectable } from '@nestjs/common';
import { ISanitize } from '../../../util';
import { TimeSheetDTO } from '../dto';
import { ITimeSheet } from '../interface';

@Injectable()
export class TimeSheetSanitizer implements ISanitize {
    constructor() { }

    sanitize(timesheet: ITimeSheet): TimeSheetDTO {
        const timesheetDTO: TimeSheetDTO = {
            id: timesheet.id,
            staffId: timesheet.staffId,
            payCode: timesheet.payCode,
            description: timesheet.description,
            hours: timesheet.hours,
            amount: timesheet.amount,
            startDate: timesheet.startDate,
            endDate: timesheet.endDate
        };
        return timesheetDTO;
    }

    sanitizeMany(timesheets: ITimeSheet[]): TimeSheetDTO[] {
        const timesheetDTOs: TimeSheetDTO[] = [];
        for (let i = 0; i < timesheets.length; i++) {
            timesheetDTOs.push(this.sanitize(timesheets[i]));
        }
        return timesheetDTOs;
    }
}

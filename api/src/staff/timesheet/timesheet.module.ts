import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { StaffModule } from '../staff.module';
import { PaycodeModule } from '../../employment/paycode/paycode.module';
import {TimeSheetSanitizer} from './interceptor';

@Module({
  imports: [StaffModule, PaycodeModule],
  controllers: [TimesheetController],
  providers: [TimesheetService, TimeSheetSanitizer]
})
export class TimesheetModule { }

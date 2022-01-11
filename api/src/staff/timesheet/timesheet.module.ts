import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { StaffModule } from '../staff.module';
import { PaycodeModule } from '../../employment/paycode/paycode.module';
import { TimeSheetSanitizer } from './interceptor';
import { OvertimeModule } from '../../overtime/overtime.module';

@Module({
  imports: [StaffModule, PaycodeModule, OvertimeModule],
  controllers: [TimesheetController],
  providers: [TimesheetService, TimeSheetSanitizer],
})
export class TimesheetModule {}

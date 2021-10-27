import { Module } from '@nestjs/common';
import { StaffModule } from '../staff';
import { AuthNModule } from 'src/authN';
import { AuthZModule } from 'src/authZ';
import { FundingModule } from 'src/funding';
import { MailerModule } from '../mailer';
import { AppController } from './app.controller';
import { DatabaseConnection } from './app.database';
import { AppService } from './app.service';
import { AddressModule } from '../address';
import { EmploymentModule } from '../employment';
import { ClientModule } from '../client';
import { DepartmentModule } from '../department/department.module';
import { CommentModule } from '../comment/comment.module';
import { HistoryModule } from '../history/history.module';
import { JobModule } from '../job/job.module';
import { SCredentialModule } from '../staff/credential/scredential.module';
import { PaycodeModule } from '../employment/paycode/paycode.module';
import { PaycodetypeModule } from '../paycodetype/paycodetype.module';
import { AvailabilityModule } from '../availability/availability.module';
import { OvertimeModule } from '../overtime/overtime.module';
import { TimesheetModule } from '../staff/timesheet/timesheet.module';
import { FileModule } from '../files/file.module';
import { AppointmentModule } from '../appointment/appointment.module';
import { PlaceModule } from '../place/place.module';
import { MileageModule } from '../mileage/mileage.module';

@Module({
  imports: [AuthNModule, AuthZModule, AddressModule, StaffModule, FundingModule,
    EmploymentModule, ClientModule, DepartmentModule, CommentModule, HistoryModule,
    JobModule, SCredentialModule, PaycodeModule, PaycodetypeModule, AvailabilityModule,
    OvertimeModule, TimesheetModule, FileModule, AppointmentModule, PlaceModule, MileageModule],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule { }

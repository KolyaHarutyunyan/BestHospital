import { Module } from '@nestjs/common';
import { StaffModule } from '../staff';
import { AuthNModule } from 'src/authN';
import { AuthZModule } from 'src/authZ';
import { FundingModule } from 'src/funding';
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
import { ApptModule } from '../appt/appt.module';
import { PlaceModule } from '../place/place.module';
import { MileageModule } from '../mileage/mileage.module';
import { BillingModule } from '../billing/billing.module';
import { ClaimModule } from '../claim/claim.module';
import { InvoiceModule } from '../invoice/invoice.module';
import { InvPmtModule } from '../invoice-pmt/invoice-pmt.module';
import { ClaimPmtModule } from '../claim-payment/claim-pmt.module';

@Module({
  imports: [
    AuthNModule,
    AuthZModule,
    AddressModule,
    StaffModule,
    FundingModule,
    EmploymentModule,
    ClientModule,
    DepartmentModule,
    CommentModule,
    HistoryModule,
    JobModule,
    SCredentialModule,
    PaycodeModule,
    PaycodetypeModule,
    AvailabilityModule,
    OvertimeModule,
    TimesheetModule,
    FileModule,
    ApptModule,
    PlaceModule,
    MileageModule,
    BillingModule,
    ClaimModule,
    InvoiceModule,
    InvPmtModule,
    ClaimPmtModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule {}

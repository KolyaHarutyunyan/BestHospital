import { Module } from '@nestjs/common';
import { ApptService } from './appt.service';
import { ApptController } from './appt.controller';
import { ClientModule } from '../client/client.module';
import { StaffModule } from '../staff/staff.module';
import { PaycodeModule } from '../employment/paycode/paycode.module';
import { AuthorizationserviceModule } from '../client/authorizationservice/authorizationservice.module';
import { ApptSanitizer } from './intcp/appt.intcp';
import { PlaceModule } from '../place/place.module';
import { BillingModule } from '../billing/billing.module';
import { EmploymentModule } from '../employment/employment.module';
import { FileModule } from '../files/file.module';

@Module({
  imports: [
    ClientModule,
    StaffModule,
    PaycodeModule,
    EmploymentModule,
    AuthorizationserviceModule,
    PlaceModule,
    BillingModule,
    FileModule
  ],
  controllers: [ApptController],
  providers: [ApptService, ApptSanitizer],
  exports: [ApptService],
})
export class ApptModule {}

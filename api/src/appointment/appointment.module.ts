import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { ClientModule } from '../client/client.module';
import { StaffModule } from '../staff/staff.module';
import {PaycodeModule} from '../employment/paycode/paycode.module';
import { AuthorizationserviceModule } from '../client/authorizationservice/authorizationservice.module';
import { AppointmentSanitizer } from './interceptor/appointment.interceptor';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [ClientModule, StaffModule, PaycodeModule, AuthorizationserviceModule, PlaceModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentSanitizer],
  exports: [AppointmentService]
})
export class AppointmentModule {}

import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { ClientModule } from '../client';
import { StaffModule } from '../staff';
import { AvailabilitySanitizer } from './interceptor';

@Module({
  imports: [ClientModule, StaffModule],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, AvailabilitySanitizer]
})
export class AvailabilityModule { }

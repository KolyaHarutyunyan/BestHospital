import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { ClientModule } from '../client';
import { StaffModule } from '../staff';

@Module({
  imports: [ClientModule, StaffModule],
  controllers: [AvailabilityController],
  providers: [AvailabilityService]
})
export class AvailabilityModule { }

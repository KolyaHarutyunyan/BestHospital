import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { AuthNModule } from '../authN';
import { StaffSanitizer } from './interceptor';
import { AddressModule } from 'src/address';
import { HistoryModule } from '../history/history.module';
import { ServiceModule } from '../service';

@Module({
  imports: [AuthNModule, AddressModule, HistoryModule, ServiceModule],
  providers: [StaffService, StaffSanitizer],
  controllers: [StaffController],
  exports: [StaffService],
})
export class StaffModule {}

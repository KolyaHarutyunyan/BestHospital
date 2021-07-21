import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { StaffService } from '../staff/staff.service';
import { StaffModule } from '../staff/staff.module';
import { HistorySanitizer } from './interceptor';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule { }

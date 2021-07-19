import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { AdminService } from '../admin/admin.service';
import { AdminModule } from '../admin/admin.module';
import { HistorySanitizer } from './interceptor';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule { }

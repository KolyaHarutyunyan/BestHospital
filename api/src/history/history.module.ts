import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { HistorySanitizer } from './interceptor';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, HistorySanitizer],
  exports: [HistoryService],
})
export class HistoryModule {}

import { Module } from '@nestjs/common';
import { FundingService } from './funding.service';
import { FundingController } from './funding.controller';
import { AddressModule } from '../address';
import { AuthNModule } from '../authN';
import { ServiceModule } from '../service';
import { FundingSanitizer } from './interceptor';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [AuthNModule, AddressModule, ServiceModule, HistoryModule],
  controllers: [FundingController],
  providers: [FundingService, FundingSanitizer],
  exports: [FundingService],
})
export class FundingModule {}

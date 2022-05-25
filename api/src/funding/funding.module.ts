import { Module } from '@nestjs/common';
import { FundingService } from './funding.service';
import { FundingController } from './funding.controller';
import { AddressModule } from '../address';
import { AuthNModule } from '../authN';
import { ServiceModule } from '../service';
import { FundingSanitizer } from './interceptor';
import { HistoryModule } from '../history/history.module';
import { ModifierController } from './controllers/modifier.controller';
import { ModifierService } from './services/modifier.service';
import { FundingServiceController } from './controllers/service.controller';

@Module({
  imports: [AuthNModule, AddressModule, ServiceModule, HistoryModule],
  controllers: [FundingController, ModifierController, FundingServiceController],
  providers: [FundingService, ModifierService, FundingSanitizer],
  exports: [FundingService],
})
export class FundingModule {}

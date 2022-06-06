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
import { ServiceController } from './controllers/service.controller';
import { Service } from './services/service';
import { CredentialModule } from '../credential';

@Module({
  imports: [AuthNModule, AddressModule, ServiceModule, HistoryModule, CredentialModule],
  controllers: [FundingController, ModifierController, ServiceController],
  providers: [FundingService, ModifierService, Service, FundingSanitizer],
  exports: [FundingService, ModifierService, Service],
})
export class FundingModule {}

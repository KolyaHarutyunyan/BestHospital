import { Module } from '@nestjs/common';
import { FundingService } from './funding.service';
import { CredentialService } from '../credential/credential.service';

import { FundingController } from './funding.controller';
import { AddressModule, AddressService } from '../address';
import { AuthNModule } from '../authN';
import { ServiceModule } from '../service';
import { FundingSanitizer } from './interceptor';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [AuthNModule, AddressModule, ServiceModule, HistoryModule],
  controllers: [FundingController],
  providers: [FundingService, CredentialService, FundingSanitizer],
  exports: [FundingService],
})
export class FundingModule { }

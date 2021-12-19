import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { ClaimSanitizer } from './interceptor/claim.interceptor';
import { BillingModule } from '../billing/billing.module';
import { ReceivableModule } from '../receivable/receivable.module';

@Module({
  imports: [BillingModule, ReceivableModule],
  controllers: [ClaimController],
  providers: [ClaimService, ClaimSanitizer]
})
export class ClaimModule {}

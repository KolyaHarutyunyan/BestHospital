import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { ClaimSanitizer } from './interceptor/claim.interceptor';
import { BillingModule } from '../billing/billing.module';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [BillingModule, StaffModule],
  controllers: [ClaimController],
  providers: [ClaimService, ClaimSanitizer],
  exports: [ClaimService],
})
export class ClaimModule {}

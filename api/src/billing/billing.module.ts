import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { StaffModule } from '../staff/staff.module';
import { BillingSanitizer } from './interceptor/billing.interceptor';

@Module({
  imports: [StaffModule],
  controllers: [BillingController],
  providers: [BillingService, BillingSanitizer],
  exports: [BillingService]
})
export class BillingModule {}

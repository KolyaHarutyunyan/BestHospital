import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { StaffModule } from '../staff/staff.module';
import { BillingSanitizer } from './interceptor/billing.interceptor';
import { TxnModule } from './txn/txn.module';

@Module({
  imports: [StaffModule, TxnModule, TxnModule],
  controllers: [BillingController],
  providers: [BillingService, BillingSanitizer],
  exports: [BillingService],
})
export class BillingModule {}

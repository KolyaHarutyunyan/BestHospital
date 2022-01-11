import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceSanitizer } from './interceptor';
import { BillingModule } from '../billing/billing.module';

@Module({
  imports: [BillingModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceSanitizer],
  exports: [InvoiceService],
})
export class InvoiceModule {}

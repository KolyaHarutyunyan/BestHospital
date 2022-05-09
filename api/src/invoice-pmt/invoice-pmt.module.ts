import { Module } from '@nestjs/common';
import { InvPmtService } from './invoice-pmt.service';
import { InvPmtController } from './invoice-pmt.controller';
import { InvoiceModule } from '../invoice/invoice.module';
import { BillingModule } from '../billing/billing.module';
import { ClientModule } from '../client';
import { InvPmtSanitizer } from './invoice-pmt.sanitizer';
import { FileModule } from '../files/file.module';

@Module({
  imports: [InvoiceModule, BillingModule, ClientModule, FileModule],
  controllers: [InvPmtController],
  providers: [InvPmtService, InvPmtSanitizer],
  exports: [InvPmtService],
})
export class InvPmtModule {}

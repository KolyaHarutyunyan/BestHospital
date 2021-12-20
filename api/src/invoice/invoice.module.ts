import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceSanitizer } from './interceptor';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceSanitizer],
  exports: [InvoiceService]
})
export class InvoiceModule {}

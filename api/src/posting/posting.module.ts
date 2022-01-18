import { Module } from '@nestjs/common';
import { PostingService } from './posting.service';
import { PostingController } from './posting.controller';
import { InvoiceModule } from '../invoice/invoice.module';
import { BillingModule } from '../billing/billing.module';

@Module({
  imports: [PostingModule, InvoiceModule, BillingModule],
  controllers: [PostingController],
  providers: [PostingService],
  exports: [PostingService],
})
export class PostingModule {}

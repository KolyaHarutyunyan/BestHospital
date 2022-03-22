import { Module } from '@nestjs/common';
import { PostingService } from './posting.service';
import { PostingController } from './posting.controller';
import { InvoiceModule } from '../invoice/invoice.module';
import { BillingModule } from '../billing/billing.module';
import { ClientModule } from '../client';
import { PostingSanitizer } from './posting.sanitizer';

@Module({
  imports: [PostingModule, InvoiceModule, BillingModule, ClientModule],
  controllers: [PostingController],
  providers: [PostingService, PostingSanitizer],
  exports: [PostingService],
})
export class PostingModule {}

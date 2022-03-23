import { Module } from '@nestjs/common';
import { PostingService } from './posting.service';
import { PostingController } from './posting.controller';
import { InvoiceModule } from '../invoice/invoice.module';
import { BillingModule } from '../billing/billing.module';
import { ClientModule } from '../client';
import { PostingSanitizer } from './posting.sanitizer';
import { FileModule } from '../files/file.module';

@Module({
  imports: [PostingModule, InvoiceModule, BillingModule, ClientModule, FileModule],
  controllers: [PostingController],
  providers: [PostingService, PostingSanitizer],
  exports: [PostingService],
})
export class PostingModule {}

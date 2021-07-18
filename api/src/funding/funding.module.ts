import { Module } from '@nestjs/common';
import { FundingService } from './funding.service';
import { HistoryService } from '../history/history.service';
import { CommentService } from '../comment/comment.service';

import { FundingController } from './funding.controller';
import { AddressModule } from 'src/address';
import { AuthNModule } from '../authN';
import { ServiceModule } from '../service';
import { CommentModule } from '../comment';

import { FundingSanitizer } from './interceptor';

@Module({
  imports: [AuthNModule, AddressModule, ServiceModule, CommentModule],
  controllers: [FundingController],
  providers: [FundingService, HistoryService, CommentService, FundingSanitizer],
  exports: [FundingService],
})
export class FundingModule { }

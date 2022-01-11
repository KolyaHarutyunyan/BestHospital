import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { ClientModule } from '../client';
import { FundingModule } from '../funding';
import { StaffModule } from '../staff';
import { CommentSanitizer } from './interceptor/comment.sanitizer';
import { AddressSanitizer } from '../address';

@Module({
  imports: [ClientModule, FundingModule, StaffModule],
  controllers: [CommentController],
  providers: [CommentService, CommentSanitizer, AddressSanitizer],
})
export class CommentModule {}

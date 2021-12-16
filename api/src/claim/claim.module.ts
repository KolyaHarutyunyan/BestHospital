import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { ClaimSanitizer } from './interceptor/claim.interceptor';

@Module({
  controllers: [ClaimController],
  providers: [ClaimService, ClaimSanitizer]
})
export class ClaimModule {}

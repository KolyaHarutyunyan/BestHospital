import { Module } from '@nestjs/common';
import { ClaimPmtService } from './claim-pmt.service';
import { ClaimPmtController } from './claim-pmt.controller';
import { ClaimPmtSanitizer } from './claim-pmt.sanitizer';
import { ClaimModule } from '../claim/claim.module';
import { FileModule } from '../files/file.module';
import { FundingModule } from '../funding/funding.module';

@Module({
  imports: [ClaimModule, FileModule, FundingModule],
  controllers: [ClaimPmtController],
  providers: [ClaimPmtService, ClaimPmtSanitizer],
})
export class ClaimPmtModule {}

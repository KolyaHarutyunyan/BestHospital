import { Module } from '@nestjs/common';
import { FundingService } from './funding.service';
import { FundingController } from './funding.controller';
import { AddressModule } from 'src/address';
import { AuthNModule } from '../authN';
import { FundingSanitizer } from './interceptor';

@Module({
  imports: [AuthNModule, AddressModule],
  controllers: [FundingController],
  providers: [FundingService, FundingSanitizer],
  exports: [FundingService],
})
export class FundingModule {}

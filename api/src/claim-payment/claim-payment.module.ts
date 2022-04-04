import { Module } from '@nestjs/common';
import { ClaimPaymentService } from './claim-payment.service';
import { ClaimPaymentController } from './claim-payment.controller';
import { ClaimPaymentSanitizer } from './claim-payment.sanitizer';

@Module({
  controllers: [ClaimPaymentController],
  providers: [ClaimPaymentService, ClaimPaymentSanitizer],
})
export class ClaimPaymentModule {}

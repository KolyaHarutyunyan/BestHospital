import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { FundingModule } from '../../funding';
import { EnrollmentSanitizer } from './interceptor/enrollment.sanitizer';

@Module({
  imports: [FundingModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, EnrollmentSanitizer],
  exports: [EnrollmentService]
})
export class EnrollmentModule { }

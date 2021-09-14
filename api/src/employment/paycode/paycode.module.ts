import { Module } from '@nestjs/common';
import { PaycodeService } from './paycode.service';
import { PaycodeController } from './paycode.controller';
import { EmploymentModule } from '..';
import { PayCodeSanitizer } from './interceptor/sanitizer.interceptor';

@Module({
  imports: [EmploymentModule],
  controllers: [PaycodeController],
  providers: [PaycodeService, PayCodeSanitizer]
})
export class PaycodeModule { }

import { Module } from '@nestjs/common';
import { PaycodeService } from './paycode.service';
import { PaycodeController } from './paycode.controller';
import { EmploymentModule } from '..';
import { PayCodeSanitizer } from './interceptor/sanitizer.interceptor';
import { PaycodetypeModule } from '../../paycodetype/paycodetype.module';

@Module({
  imports: [EmploymentModule, PaycodetypeModule],
  controllers: [PaycodeController],
  providers: [PaycodeService, PayCodeSanitizer],
  exports: [PaycodeService]
})
export class PaycodeModule { }

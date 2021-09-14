import { Module } from '@nestjs/common';
import { PaycodetypeController } from './paycodetype.controller';
import { PayCodeTypeSanitizer } from './interceptor/paycodetype.interceptor';
import { PaycodetypeService } from './paycodetype.service';

@Module({
  controllers: [PaycodetypeController],
  providers: [PaycodetypeService, PayCodeTypeSanitizer],
  exports: [PaycodetypeService]
})
export class PaycodetypeModule { }

// @Module({
//   imports: [EmploymentModule],
//   controllers: [PaycodeController],
//   providers: [PaycodeService, PayCodeSanitizer]
// })
// export class PaycodeModule { }
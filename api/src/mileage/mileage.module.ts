import { Module } from '@nestjs/common';
import { MileageService } from './mileage.service';
import { MileageController } from './mileage.controller';
import { MileageSanitizer } from './interceptor/mileage.interceptor';

@Module({
  controllers: [MileageController],
  providers: [MileageService, MileageSanitizer],
  exports: [MileageService],
})
export class MileageModule {}

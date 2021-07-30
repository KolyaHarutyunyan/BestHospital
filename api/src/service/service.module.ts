import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceSanitizer } from './interceptor';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceSanitizer],
  exports: [ServiceModule, ServiceService]
})
export class ServiceModule {}

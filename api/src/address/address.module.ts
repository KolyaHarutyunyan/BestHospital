import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressSanitizer } from './interceptor/sanitizer.interceptor';

@Module({
  providers: [AddressService, AddressSanitizer],
  controllers: [AddressController],
  exports: [AddressService, AddressSanitizer],
})
export class AddressModule {}

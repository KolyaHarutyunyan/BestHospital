import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactSanitizer } from './interceptor';
import { AddressModule } from '../../address/address.module';

@Module({
  imports: [AddressModule],
  controllers: [ContactController],
  providers: [ContactService, ContactSanitizer]
})
export class ContactModule { }

import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { AuthNModule } from '../authN';
import { StaffSanitizer } from './interceptor';
import { AddressModule } from 'src/address';
import { CredentialModule, CredentialService } from '../credential';

@Module({
  imports: [AuthNModule, AddressModule, CredentialModule],
  providers: [StaffService, StaffSanitizer, CredentialService],
  controllers: [StaffController],
  exports: [StaffService],
})
export class StaffModule { }

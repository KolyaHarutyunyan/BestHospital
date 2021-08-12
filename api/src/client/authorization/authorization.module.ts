import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationSanitizer } from './interceptor/authorization.sanitizer';
import { FundingModule } from '../../funding';
import { AddressModule } from '../../address';

@Module({
  imports: [FundingModule, AddressModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, AuthorizationSanitizer]
})
export class AuthorizationModule { }

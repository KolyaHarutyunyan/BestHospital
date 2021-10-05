import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationSanitizer } from './interceptor/authorization.sanitizer';
import { FundingModule } from '../../funding';
import { AddressModule } from '../../address';
import { EnrollmentModule } from '../enrollment';

@Module({
  imports: [FundingModule, AddressModule, EnrollmentModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, AuthorizationSanitizer]
})
export class AuthorizationModule { }

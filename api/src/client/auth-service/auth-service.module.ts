import { Module } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { AuthServiceController } from './auth-service.controller';
import { FundingModule } from '../../funding';
import { AuthServiceSanitizer } from './interceptor/auth-service.interceptor';
import { CredentialModule } from '../../credential';

@Module({
  imports: [FundingModule, CredentialModule],
  controllers: [AuthServiceController],
  providers: [AuthService, AuthServiceSanitizer],
  exports: [AuthService],
})
export class AuthorizationserviceModule {}

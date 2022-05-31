import { Module } from '@nestjs/common';
import { AuthorizationService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthSanitizer } from './interceptor/auth.sanitizer';
import { FundingModule } from '../../funding';
import { AddressModule } from '../../address';
import { EnrollmentModule } from '../enrollment';
import { AuthorizationserviceModule } from '../auth-service/auth-service.module';
import { FileModule } from '../../files/file.module';

@Module({
  imports: [FundingModule, AddressModule, EnrollmentModule, AuthorizationserviceModule, FileModule],
  controllers: [AuthController],
  providers: [AuthorizationService, AuthSanitizer],
})
export class AuthorizationModule {}

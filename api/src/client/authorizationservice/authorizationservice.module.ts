import { Module } from '@nestjs/common';
import { AuthorizationserviceService } from './authorizationservice.service';
import { AuthorizationserviceController } from './authorizationservice.controller';
import { FundingModule } from '../../funding';
import { AuthorizationServiceSanitizer } from './interceptor/authorizationService.interceptor';

@Module({
  imports: [FundingModule],
  controllers: [AuthorizationserviceController],
  providers: [AuthorizationserviceService, AuthorizationServiceSanitizer]
})
export class AuthorizationserviceModule { }

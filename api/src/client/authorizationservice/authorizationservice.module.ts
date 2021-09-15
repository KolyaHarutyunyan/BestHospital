import { Module } from '@nestjs/common';
import { AuthorizationserviceService } from './authorizationservice.service';
import { AuthorizationserviceController } from './authorizationservice.controller';
import { FundingModule } from '../../funding';
import { AuthorizationServiceSanitizer } from './interceptor/authorizationService.interceptor';
import { ModifierModule } from '../../funding/modifier/modifier.module';
import { ModifierService } from '../../funding/modifier/modifier.service';
import { CredentialService } from '../../credential/credential.service';
import { CredentialModule } from '../../credential';
import { ModifySanitizer } from '../../funding/modifier/interceptor/modifier.interceptor';
// import { ModifierModule } from 'test/modules';
@Module({
  imports: [FundingModule, ModifierModule, CredentialModule],
  controllers: [AuthorizationserviceController],
  providers: [AuthorizationserviceService, AuthorizationServiceSanitizer, ModifierService, ModifySanitizer, CredentialService]
})
export class AuthorizationserviceModule { }

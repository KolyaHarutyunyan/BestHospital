import { Module } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { ModifierController } from './modifier.controller';
import { FundingModule } from '../funding.module';
import { FundingService } from '..';
import { CredentialModule } from '../../credential/credential.module';
import { CredentialService } from '../../credential/credential.service';
import { ModifySanitizer } from './interceptor/modifier.interceptor';

@Module({
  imports: [FundingModule, CredentialModule],
  controllers: [ModifierController],
  providers: [ModifierService, CredentialService, ModifySanitizer],
  exports: [ModifierService],
})
export class ModifierModule { }

import { Module } from '@nestjs/common';
import { CredentialModule } from '../../credential';
import { StaffModule } from '../staff.module';
import { SCredentialController } from './scredential.controller';
import { SCredentialSanitizer } from './scredential.sanitizer';
import { SCredentialService } from './scredential.service';

@Module({
  imports: [StaffModule, CredentialModule],
  controllers: [SCredentialController],
  providers: [SCredentialService, SCredentialSanitizer],
})
export class SCredentialModule {}

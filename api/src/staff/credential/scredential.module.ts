import { Module } from '@nestjs/common';
import { CredentialModule, CredentialService } from '../../credential';
import { StaffModule } from '../staff.module';
import { SCredentialController } from './scredential.controller';
import { SCredentialService } from './scredential.service';

@Module({
  imports: [StaffModule, CredentialModule],
  controllers: [SCredentialController],
  providers: [SCredentialService, CredentialService],
})
export class SCredentialModule {}

import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { FundingModule } from '../funding';
import { ClientController } from './client.controller';
import { ClientSanitizer } from './interceptor';

//check
import { HistorySanitizer, HistoryService } from 'src/history';
import { CredentialModule } from '../credential';
import { ServiceModule } from '../service';
import { AddressSanitizer } from '../address';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AuthorizationModule } from './auth/auth.module';
import { AuthorizationserviceModule } from './auth-service/auth-service.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ServiceModule,
    EnrollmentModule,
    AuthorizationModule,
    AuthorizationserviceModule,
    ContactModule,
    FundingModule,
    CredentialModule,
  ],
  controllers: [ClientController],
  providers: [ClientService, HistoryService, ClientSanitizer, HistorySanitizer, AddressSanitizer],
  exports: [ClientService],
})
export class ClientModule {}

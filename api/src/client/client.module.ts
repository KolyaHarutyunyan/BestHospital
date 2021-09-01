import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { FundingService, FundingModule } from '../funding';
import { ClientController } from './client.controller';
import { ClientSanitizer } from './interceptor';


//check
import { HistorySanitizer, HistoryService } from 'src/history';
import { CredentialService } from 'src/credential';
import { ServiceModule } from '../service'
import { FundingSanitizer } from 'src/funding/interceptor';
import { AddressSanitizer } from 'src/address';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthorizationserviceModule } from './authorizationservice/authorizationservice.module';
import { ContactModule } from './contact/contact.module';
import { AvailabilityModule } from '../availability/availability.module';

@Module({
  imports: [ServiceModule, EnrollmentModule, AuthorizationModule, AuthorizationserviceModule, ContactModule, FundingModule, AvailabilityModule],
  controllers: [ClientController],
  providers: [ClientService, HistoryService, CredentialService,
     ClientSanitizer,
    HistorySanitizer, AddressSanitizer],
  exports: [ClientService]
})
export class ClientModule { }

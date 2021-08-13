import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { FundingService, FundingModule } from '../funding';
import { ClientController } from './client.controller';
import { ClientSanitizer, ContactSanitizer } from './interceptor';


//check
import { HistorySanitizer, HistoryService } from 'src/history';
import { CredentialService } from 'src/credential';
import { CommentService } from 'src/comment';
import { ServiceModule } from '../service'
import { FundingSanitizer } from 'src/funding/interceptor';
import { AddressSanitizer } from 'src/address';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthorizationserviceModule } from './authorizationservice/authorizationservice.module';

@Module({
  imports: [ServiceModule, EnrollmentModule, AuthorizationModule, AuthorizationserviceModule],
  controllers: [ClientController],
  providers: [ClientService, FundingService, HistoryService, CredentialService,
    CommentService, ClientSanitizer, ContactSanitizer, FundingSanitizer,
    HistorySanitizer, AddressSanitizer],
  exports: [ClientService]
})
export class ClientModule { }

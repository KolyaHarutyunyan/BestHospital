import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { FundingService, FundingModule } from '../funding';
import { ClientController } from './client.controller';
import { ClientSanitizer, ContactSanitizer, EnrollmentSanitizer } from './interceptor';


//check
import { HistorySanitizer, HistoryService } from 'src/history';
import { CredentialService } from 'src/credential';
import { CommentService } from 'src/comment';
import { ServiceModule } from '../service'
import { FundingSanitizer } from 'src/funding/interceptor';
import { AddressSanitizer } from 'src/address';
import { AuthorizationSanitizer, AuthorizationServiceSanitizer } from './interceptor'

@Module({
  imports: [ServiceModule],
  controllers: [ClientController],
  providers: [ClientService, FundingService, HistoryService, CredentialService,
    CommentService, ClientSanitizer, ContactSanitizer, FundingSanitizer,
    HistorySanitizer, AddressSanitizer, EnrollmentSanitizer, AuthorizationSanitizer, AuthorizationServiceSanitizer],
  exports: [ClientService]
})
export class ClientModule { }

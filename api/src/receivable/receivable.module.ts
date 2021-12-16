import { Module } from '@nestjs/common';
import { ReceivableService } from './receivable.service';
import { ReceivableController } from './receivable.controller';
import { ReceivableSanitizer } from './interceptor';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [PlaceModule],
  controllers: [ReceivableController],
  providers: [ReceivableService, ReceivableSanitizer]
})
export class ReceivableModule { }

import { Module } from '@nestjs/common';
import { TxnController } from './txn.controller';
import { TxnSanitizer } from './txn.sanitizer';
import { TxnService } from './txn.service';

@Module({
  controllers: [TxnController],
  providers: [TxnService, TxnSanitizer],
  exports: [TxnService],
})
export class TxnModule {}

import { Module } from '@nestjs/common';
import { TxnService } from './txn.service';

@Module({
  providers: [TxnService],
  exports: [TxnService],
})
export class TxnModule {}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN';
import { ParseObjectIdPipe } from '../util';
import { TxnDto } from './dto';
import { TxnService } from './txn.service';

@Controller('txn')
@ApiTags('Txn Endpoints')
export class TxnController {
  constructor(private readonly txnService: TxnService) {}
  /** create payment */
  @Get(':billingId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [TxnDto] })
  @ApiQuery({
    name: 'skip',
    description: 'where',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    description: 'how',
    required: false,
    type: Number,
  })
  create(
    @Param('billingId', ParseObjectIdPipe) billingId: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return this.txnService.getByBilling(billingId, limit, skip);
  }
}

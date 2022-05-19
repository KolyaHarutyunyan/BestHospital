import { Controller, Get, Post, Body, Patch, Param, Query, Request } from '@nestjs/common';
import { IRequest, ParseObjectIdPipe, Public } from '../util';
import { startSession } from 'mongoose';
import { BillingService } from './billing.service';
import { CreateBillingDto, BillingDto } from './dto';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BillingStatus, ClaimStatus, InvoiceStatus } from './billing.constants';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { TxnDto } from './txn/dto';

@Controller('billing')
@ApiTags('Billing Endpoints')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // @Post()
  // @ApiHeader({ name: ACCESS_TOKEN })
  // @ApiOkResponse({ type: BillingDto })
  // async create(@Body() createBillingDto: CreateBillingDto): Promise<BillingDto> {
  //   return this.billingService.create(createBillingDto);
  // }

  @Post('/addTransaction/:id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: BillingDto })
  async startTransaction(
    @Body() createTransactionDto: TxnDto,
    @Param('id', ParseObjectIdPipe) billingId: string,
  ) {
    const session = await startSession();
    return this.billingService.startTransaction(createTransactionDto, billingId);
  }

  @Post(':id/abortTransaction/:tsxId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: BillingDto })
  async abortTransaction(
    @Request() req: IRequest,
    @Param('id', ParseObjectIdPipe) billingId: string,
    @Param('tsxId', ParseObjectIdPipe) tsxId: string,
  ) {
    const userId: string = req.body.user.id;
    return this.billingService.abortTransaction(billingId, tsxId, userId);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [BillingDto] })
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
  // @ApiQuery({ name: 'claimStatus', enum: ClaimStatus })
  // @Query('claimStatus') claimStatus: ClaimStatus
  async findAll(@Query('limit') limit: number, @Query('skip') skip: number) {
    return await this.billingService.findAll(skip, limit);
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: BillingDto })
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
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return await this.billingService.findOne(id, skip, limit);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBillingDto: UpdateBillingDto) {
  //   return this.billingService.update(+id, updateBillingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.billingService.remove(+id);
  // }

  /** Set billing status */
  @Patch(':id/setStatus')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: BillingDto })
  @ApiQuery({ name: 'status', enum: BillingStatus })
  async setStatus(
    @Param('id', ParseObjectIdPipe) billingId: string,
    @Request() req: IRequest,
    @Query('status') status: BillingStatus,
  ) {
    const userId: string = req.body.user.id;
    const billing = await this.billingService.setStatus(billingId, status, userId);
    return billing;
  }
  /** set claim status */
  @Patch(':id/claimStatus')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [BillingDto] })
  @ApiQuery({ name: 'claimStatus', enum: ClaimStatus })
  async setClaimStatus(
    @Query('claimStatus') claimStatus: ClaimStatus,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return await this.billingService.setClaimStatus(id, claimStatus);
  }
  /** set invoice status */
  @Patch(':id/invoiceStatus')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [BillingDto] })
  @ApiQuery({ name: 'invoiceStatus', enum: InvoiceStatus })
  async setInvoiceStatus(
    @Query('invoiceStatus') invoiceStatus: InvoiceStatus,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return await this.billingService.setInvoiceStatus(id, invoiceStatus);
  }
}

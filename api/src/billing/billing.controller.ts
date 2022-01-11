import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { IRequest, ParseObjectIdPipe, Public } from '../util';
import { startSession } from 'mongoose';
import { BillingService } from './billing.service';
import { CreateBillingDto, UpdateBillingDto, BillingDto, TransactionDto } from './dto';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BillingStatus, ClaimStatus } from './billing.constants';
import { ACCESS_TOKEN } from '../authN/authN.constants';

@Controller('billing')
@ApiTags('Billing Endpoints')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: BillingDto })
  async create(@Body() createBillingDto: CreateBillingDto): Promise<BillingDto> {
    return this.billingService.create(createBillingDto);
  }

  @Post('/addTransaction/:id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: BillingDto })
  async startTransaction(
    @Body() createTransactionDto: TransactionDto,
    @Param('id', ParseObjectIdPipe) billingId: string,
  ) {
    const session = await startSession();
    return this.billingService.startTransaction(createTransactionDto, billingId, session);
  }

  @Post('/abortTransaction/:id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: BillingDto })
  async abortTransaction(@Param('id', ParseObjectIdPipe) billingId: string) {
    return this.billingService.abortTransaction(billingId);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [BillingDto] })
  @ApiQuery({ name: 'claimStatus', enum: ClaimStatus })
  async findAll(@Query('claimStatus') claimStatus: ClaimStatus) {
    return await this.billingService.findAll(claimStatus);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.billingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillingDto: UpdateBillingDto) {
    return this.billingService.update(+id, updateBillingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingService.remove(+id);
  }

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
}

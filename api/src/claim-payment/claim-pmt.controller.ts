import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../util';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { ClaimPmtService } from './claim-pmt.service';
import { ClaimPmtDto } from './dto/claim-pmt.dto.';
import {
  CreateClaimPmtDto,
  CreateClaimReceivableDTO,
  CreateDocDTO,
} from './dto/create-claim-pmt.dto';
import { UpdateClaimPmtDto } from './dto/update-claim-payment.dto';

@Controller('claim-pmt')
@ApiTags('Claim-pmt Endpoints')
export class ClaimPmtController {
  constructor(private readonly claimPmtService: ClaimPmtService) {}
  /** create claim-pmts payment */
  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ClaimPmtDto })
  create(@Body() createClaimPmtDto: CreateClaimPmtDto) {
    return this.claimPmtService.create(createClaimPmtDto);
  }
  /** add document*/
  @Post(':id/documents')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ClaimPmtDto })
  async addDocument(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CreateDocDTO,
  ): Promise<ClaimPmtDto> {
    return await this.claimPmtService.addDocument(id, dto);
  }
  /** delete document*/
  @Delete(':id/documents/:docId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ClaimPmtDto })
  async deleteDocument(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('docId', ParseObjectIdPipe) docId: string,
  ): Promise<ClaimPmtDto> {
    return await this.claimPmtService.deleteDocument(id, docId);
  }
  /** add receivable */
  @Post(':id/payment')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ClaimPmtDto })
  addReceivable(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() createReceivableDTO: CreateClaimReceivableDTO,
  ) {
    return this.claimPmtService.payment(id, createReceivableDTO);
  }

  /** get all claim-pmts */
  @Get()
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
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [ClaimPmtDto] })
  findAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.claimPmtService.findAll(skip, limit);
  }
  /** get claim-pmt by id */
  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ClaimPmtDto })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.claimPmtService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ClaimPmtDto })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateClaimPmtDto: UpdateClaimPmtDto) {
    return this.claimPmtService.update(id, updateClaimPmtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimPmtService.remove(+id);
  }
}

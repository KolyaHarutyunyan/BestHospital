import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InvPmtService } from './invoice-pmt.service';
import { CreateInvPmtDto, UpdateInvPmtDto, InvPmtDto, CreateReceivableDTO, CreateDocDTO } from './dto';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN';
import { ParseObjectIdPipe } from '../util';

@Controller('invoice-pmt')
@ApiTags('Invoice-pmt Endpoints')
export class InvPmtController {
  constructor(private readonly invPmtService: InvPmtService) {}
  /** create payment */
  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: InvPmtDto })
  create(@Body() createInvPmtDto: CreateInvPmtDto) {
    return this.invPmtService.create(createInvPmtDto);
  }
  /** add receivable */
  @Post(':id/payment')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: InvPmtDto })
  addReceivable(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() createReceivableDTO: CreateReceivableDTO,
  ) {
    return this.invPmtService.payment(id, createReceivableDTO);
  }
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
  @ApiOkResponse({ type: [InvPmtDto] })
  findAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.invPmtService.findAll(skip, limit);
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: InvPmtDto })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.invPmtService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: InvPmtDto })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateInvPmtDto: UpdateInvPmtDto) {
    return this.invPmtService.update(id, updateInvPmtDto);
  }
  /** add document*/
  @Post(':id/documents')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: InvPmtDto })
  async addDocument(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CreateDocDTO,
  ): Promise<InvPmtDto> {
    return await this.invPmtService.addDocument(id, dto);
  }
  /** delete document*/
  @Delete(':id/documents/:docId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: InvPmtDto })
  async deleteDocument(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('docId', ParseObjectIdPipe) docId: string,
  ): Promise<InvPmtDto> {
    return await this.invPmtService.deleteDocument(id, docId);
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postingService.remove(+id);
  // }
}

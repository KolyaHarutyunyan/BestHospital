import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvPmtService } from './invoice-pmt.service';
import { CreateInvPmtDto, UpdateInvPmtDto, InvPmtDto, CreateReceivableDTO } from './dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [InvPmtDto] })
  findAll() {
    return this.invPmtService.findAll();
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
  @Patch(':id/file/add/:fileId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: InvPmtDto })
  addDocument(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('fileId', ParseObjectIdPipe) fileId: string,
  ) {
    return this.invPmtService.addDocument(id, fileId);
  }
  @Patch(':id/file/delete/:fileId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: InvPmtDto })
  deleteDocument(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('fileId', ParseObjectIdPipe) fileId: string,
  ) {
    return this.invPmtService.deleteDocument(id, fileId);
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postingService.remove(+id);
  // }
}

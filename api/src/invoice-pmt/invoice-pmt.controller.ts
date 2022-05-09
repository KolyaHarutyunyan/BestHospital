import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvPmtService } from './invoice-pmt.service';
import { CreateInvPmtDto, UpdateInvPmtDto, InvPmtDto } from './dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN';
import { ParseObjectIdPipe } from 'src/util';

@Controller('invoice-pmt')
@ApiTags('Invoice-pmt Endpoints')
export class InvPmtController {
  constructor(private readonly invPmtService: InvPmtService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  create(@Body() createInvDto: CreateInvPmtDto) {
    return this.invPmtService.create(createInvDto);
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

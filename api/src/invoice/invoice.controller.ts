import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, UpdateInvoiceDto, InvoiceDto, GenerateInvoiceDto } from './dto';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN';
import { ParseObjectIdPipe } from '../util';

@Controller('invoice')
@ApiTags('Invoice Endpoints')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return await this.invoiceService.create(createInvoiceDto);
  }

  @Post('generate')
  @ApiHeader({ name: ACCESS_TOKEN })
  // @ApiQuery({ name: 'group', enum: MergeClaims })
  @ApiOkResponse({ type: [InvoiceDto] })
  generateInvoices(
    @Body() generateInvoices: GenerateInvoiceDto,
    // @Query('group') group: MergeClaims
  ) {
    return this.invoiceService.generateInvoices(generateInvoices);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.invoiceService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReceivableService } from './receivable.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN';
import {CreateReceivableDto, ReceivableDto, UpdateReceivableDto} from './dto';
import { ParseObjectIdPipe } from '../util';

@Controller('receivable')
@ApiTags('Receivable Endpoints')
export class ReceivableController {
  constructor(private readonly receivableService: ReceivableService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  async create(@Body() createReceivableDto: CreateReceivableDto) {
    return await this.receivableService.create(createReceivableDto);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  async findAll() {
    return await this.receivableService.findAll();
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.receivableService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  update(@Param('id') id: string, @Body() updateReceivableDto: UpdateReceivableDto) {
    return this.receivableService.update(+id, updateReceivableDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  remove(@Param('id') id: string) {
    return this.receivableService.remove(+id);
  }
}

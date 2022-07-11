import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create.dto';
import { UpdateGlobServiceDto } from './dto/edit.dto';
import { ServiceDTO } from './dto';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { ParseObjectIdPipe } from 'src/util';

@Controller('service')
@ApiTags('Service Endpoints')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ServiceDTO })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ServiceDTO })
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
  findAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.serviceService.findAll(skip, limit);
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ServiceDTO })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ServiceDTO })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateServiceDto: UpdateGlobServiceDto,
  ) {
    return this.serviceService.update(id, updateServiceDto);
  }

  // @Delete(':id')
  // @ApiHeader({ name: ACCESS_TOKEN })
  // @ApiOkResponse({ type: ServiceDTO })
  // remove(@Param('id', ParseObjectIdPipe) id: string) {
  //   return this.serviceService.remove(id);
  // }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Public } from '../util';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create.dto';
import { UpdateServiceDto } from './dto/edit.dto';
import { ServiceDTO } from './dto';

@Controller('service')
@ApiTags('Service Endpoints')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post()
  @Public()
  @ApiOkResponse({ type: ServiceDTO })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: ServiceDTO })
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ type: ServiceDTO })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ServiceDTO })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ServiceDTO })
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}

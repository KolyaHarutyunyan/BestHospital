import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MileageService } from './mileage.service';
import { ParseObjectIdPipe, Public } from 'src/util';
import { MileageDTO, CreateMileageDto, UpdateMileageDto } from './dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN/authN.constants';

@Controller('mileage')
@ApiTags('Mileage Endpoints')
export class MileageController {
  constructor(private readonly mileageService: MileageService) { }

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: MileageDTO })
  create(@Body() createMileageDto: CreateMileageDto) {
    return this.mileageService.create(createMileageDto);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [MileageDTO] })
  findAll() {
    return this.mileageService.findAll();
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: MileageDTO })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.mileageService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: MileageDTO })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateMileageDto: UpdateMileageDto) {
    return this.mileageService.update(id, updateMileageDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: String })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.mileageService.remove(id);
  }
}

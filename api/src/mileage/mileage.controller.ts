import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MileageService } from './mileage.service';
import { ParseObjectIdPipe, Public } from 'src/util';
import { MileageDTO, CreateMileageDto, UpdateMileageDto } from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('mileage')
@ApiTags('Mileage Endpoints')
export class MileageController {
  constructor(private readonly mileageService: MileageService) { }

  @Post()
  @Public()
  @ApiOkResponse({ type: MileageDTO })
  create(@Body() createMileageDto: CreateMileageDto) {
    return this.mileageService.create(createMileageDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: [MileageDTO] })
  findAll() {
    return this.mileageService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ type: MileageDTO })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.mileageService.findOne(id);
  }

  @Patch(':id')
  @Public()
  @ApiOkResponse({ type: MileageDTO })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateMileageDto: UpdateMileageDto) {
    return this.mileageService.update(id, updateMileageDto);
  }

  @Delete(':id')
  @Public()
  @ApiOkResponse({ type: String })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.mileageService.remove(id);
  }
}

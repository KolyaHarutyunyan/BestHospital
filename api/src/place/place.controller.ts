import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaceService } from './place.service';
import { ParseObjectIdPipe } from '../util';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlaceDto, UpdatePlaceDto, PlaceDTO } from './dto';
import { ACCESS_TOKEN } from '../authN/authN.constants';

@Controller('place')
@ApiTags('Place Endpoints')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PlaceDTO })
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [PlaceDTO] })
  findAll() {
    return this.placeService.findAll();
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PlaceDTO })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.placeService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PlaceDTO })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: String })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.placeService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaceService } from './place.service';
import { ParseObjectIdPipe, Public } from '../util';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlaceDto, UpdatePlaceDto, PlaceDTO } from './dto';

@Controller('place')
@ApiTags('Place Endpoints')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) { }

  @Post()
  @Public()
  @ApiOkResponse({ type: PlaceDTO })
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: [PlaceDTO] })
  findAll() {
    return this.placeService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ type: PlaceDTO })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.placeService.findOne(id);
  }

  @Patch(':id')
  @Public()
  @ApiOkResponse({ type: PlaceDTO })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  @Public()
  @ApiOkResponse({ type: String })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.placeService.remove(id);
  }
}

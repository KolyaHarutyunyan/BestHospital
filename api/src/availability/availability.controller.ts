import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityDTO, CreateAvailabilityDTO } from './dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../util';
import { ACCESS_TOKEN } from '../authN/authN.constants';

@Controller('availability')
@ApiTags('Availability Endpoints')
export class AvailabilityController {
  constructor(private readonly scheduleService: AvailabilityService) { }

  @Post(":ownerId/:onModel")
  @Public()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AvailabilityDTO })
  createSchedule(
    @Body() createScheduleDto: CreateAvailabilityDTO,
    @Param('ownerId', ParseObjectIdPipe) ownerId: string,
    @Param('onModel') onModel: string) {
    return this.scheduleService.createSchedule(createScheduleDto, ownerId, onModel);
  }

  @Get(':ownerId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AvailabilityDTO })
  findOne(@Param('ownerId', ParseObjectIdPipe) owner: string) {
    return this.scheduleService.findOne(owner);
  }
}

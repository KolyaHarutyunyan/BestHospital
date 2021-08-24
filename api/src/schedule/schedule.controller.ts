import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDTO, UpdateScheduleDTO } from './dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../util';

@Controller('schedule')
@ApiTags('Schedule Endpoints')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  @Post(":ownerId/:onModel")
  @Public()
  createSchedule(
    @Body() createScheduleDto: CreateScheduleDTO,
    @Param('ownerId', ParseObjectIdPipe) ownerId: string,
    @Param('onModel') onModel: string) {
  return this.scheduleService.createSchedule(createScheduleDto, ownerId, onModel);
}

@Get(':ownerId')
@Public()
findOne(@Param('ownerId', ParseObjectIdPipe) owner: string) {
  return this.scheduleService.findOne(owner);
}

@Patch(':id')
@Public()
update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateScheduleDTO) {
  return this.scheduleService.update(id, dto);
}

@Delete(':id')
remove(@Param('id', ParseObjectIdPipe) id: string) {
  return this.scheduleService.remove(id);
}
}

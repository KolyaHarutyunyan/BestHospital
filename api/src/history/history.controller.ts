import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../util';
import { HistoryService } from './history.service';
import { HistoryDTO } from './dto';
import { IsDateString, isDateString } from 'class-validator';

@Controller('history')
@ApiTags('History Endpoints')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @Get(':resourceId/:onModel')
  @Public()
  @ApiOkResponse({ type: HistoryDTO })
  @ApiQuery({
    name: "skip",
    description: "where",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: "limit",
    description: "how",
    required: false,
    type: Number
  })
  @ApiQuery({
    name: "start",
    description: "startDate",
    required: false,
    type: IsDateString
  })
  @ApiQuery({
    name: "end",
    description: "endDate",
    required: false,
    type: IsDateString
  })
  async findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('start') start: Date,
    @Query('end') end: Date,
    @Param('resourceId', ParseObjectIdPipe) resourceId: string,
    @Param('onModel') onModel: string
  ) {
    return await this.historyService.findAll(onModel, resourceId, skip, limit, start, end);
  }
}

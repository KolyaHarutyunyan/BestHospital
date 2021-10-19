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
    type: Date
  })
  async findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('start') start: Date,
    @Param('onModel') onModel: string
  ) {
    return await this.historyService.findAll(onModel, skip, limit, start);
  }
}

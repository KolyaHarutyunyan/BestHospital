import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { HistoryDTO } from './dto';
import { ACCESS_TOKEN } from '../authN/authN.constants';

@Controller('history')
@ApiTags('History Endpoints')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':onModel')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: HistoryDTO })
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
  @ApiQuery({
    name: 'start',
    description: 'startDate',
    required: false,
    type: Date,
  })
  async findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('start') start: Date,
    @Param('onModel') onModel: string,
  ) {
    return await this.historyService.findAll(onModel, skip, limit, start);
  }
}

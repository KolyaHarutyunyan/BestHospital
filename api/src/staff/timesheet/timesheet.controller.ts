import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDTO, TimeSheetDTO } from './dto';
import { ParseObjectIdPipe, Public } from '../../util';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('timesheet')
@ApiTags('TimeSheet Endpoints')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) { }

  @Post()
  @Public()
  @ApiOkResponse({ type: TimeSheetDTO })
  async create(@Body() createTimesheetDto: CreateTimesheetDTO) {
    return await this.timesheetService.create(createTimesheetDto);
  }

  @Get('staff/:staffId')
  @Public()
  async findAll(@Param('staffId', ParseObjectIdPipe) staffId: string): Promise<TimeSheetDTO[]> {
    return await this.timesheetService.findAll(staffId);
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ type: TimeSheetDTO })
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<TimeSheetDTO> {
    return await this.timesheetService.findOne(id);
  }
}

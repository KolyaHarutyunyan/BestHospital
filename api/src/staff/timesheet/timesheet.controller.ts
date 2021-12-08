import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDTO, TimeSheetDTO, EditTimesheetDTO } from './dto';
import { ParseObjectIdPipe } from '../../util';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../../authN/authN.constants';

@Controller('timesheet')
@ApiTags('TimeSheet Endpoints')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) { }

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: TimeSheetDTO })
  async create(@Body() createTimesheetDto: CreateTimesheetDTO) {
    return await this.timesheetService.create(createTimesheetDto);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: TimeSheetDTO })
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() editTimesheetDto: EditTimesheetDTO) {
    return await this.timesheetService.update(id, editTimesheetDto);
  }

  @Get('staff/:staffId')
  @ApiHeader({ name: ACCESS_TOKEN })
  async findAll(@Param('staffId', ParseObjectIdPipe) staffId: string): Promise<TimeSheetDTO[]> {
    return await this.timesheetService.findAll(staffId);
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: TimeSheetDTO })
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<TimeSheetDTO> {
    return await this.timesheetService.findOne(id);
  }
}

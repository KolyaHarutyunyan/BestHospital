import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OvertimeService } from './overtime.service';
import { CreateOvertimeDTO, OvertimeDTO, UpdateOvertimeDTO } from './dto';
import { ParseObjectIdPipe } from '../util';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN/authN.constants';

@Controller('overtime')
@ApiTags('Overtime Endpoints')
export class OvertimeController {
  constructor(private readonly overtimeService: OvertimeService) { }

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: OvertimeDTO })
  async create(@Body() createOvertimeDto: CreateOvertimeDTO) {
    return await this.overtimeService.create(createOvertimeDto);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: [OvertimeDTO]})
  async findAll() {
    return await this.overtimeService.findAll();
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: OvertimeDTO})
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.overtimeService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: OvertimeDTO})
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateOvertimeDto: UpdateOvertimeDTO) {
    return await this.overtimeService.update(id, updateOvertimeDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: String})
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.overtimeService.remove(id);
  }
}

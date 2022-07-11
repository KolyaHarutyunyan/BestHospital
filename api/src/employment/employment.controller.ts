import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { ParseObjectIdPipe } from '../util';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmploymentDto, CreateEmploymentDto, UpdateEmploymentDto } from './dto';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { Cron } from '@nestjs/schedule';
import { CreateTerminationDto } from '../termination/dto';

@Controller('employment')
@ApiTags('Employment Endpoints')
export class EmploymentController {
  constructor(private readonly employmentService: EmploymentService) {}
  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: EmploymentDto })
  async create(@Body() createEmploymentDto: CreateEmploymentDto) {
    return await this.employmentService.create(createEmploymentDto);
  }

  @Get('staff/:staffId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [EmploymentDto] })
  async findAll(@Param('staffId', ParseObjectIdPipe) staffId: string) {
    return await this.employmentService.findAll(staffId);
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: EmploymentDto })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.employmentService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: EmploymentDto })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateEmploymentDto: UpdateEmploymentDto,
  ) {
    return await this.employmentService.update(id, updateEmploymentDto);
  }

  @Patch(':id/active')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: EmploymentDto })
  async active(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.employmentService.active(id);
  }

  @Patch(':id/inActive')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: EmploymentDto })
  async inActive(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.employmentService.inActive(id);
  }
  @Patch(':id/terminate')
  @ApiOkResponse({ type: EmploymentDto })
  async terminate(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CreateTerminationDto,
  ): Promise<EmploymentDto> {
    return await this.employmentService.terminate(id, dto);
  }
  @Cron('0 1 * * *')
  async activeEmploymentCheck() {
    return await this.employmentService.setEmploymentActive();
  }
}

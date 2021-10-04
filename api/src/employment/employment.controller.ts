import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { Public, ParseObjectIdPipe } from '../util';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmploymentDto, CreateEmploymentDto, UpdateEmploymentDto } from './dto';

@Controller('employment')
@ApiTags('Employment Endpoints')
export class EmploymentController {
  constructor(private readonly employmentService: EmploymentService) { }
  @Post()
  @Public()
  @ApiOkResponse({ type: EmploymentDto })
  async create(@Body() createEmploymentDto: CreateEmploymentDto) {
    return await this.employmentService.create(createEmploymentDto);
  }
  @Get('staff/:staffId')
  @Public()
  @ApiOkResponse({ type: [EmploymentDto] })
  async findAll(@Param('staffId', ParseObjectIdPipe) staffId: string) {
    return await this.employmentService.findAll(staffId);
  }
  @Get(':id')
  @Public()
  @ApiOkResponse({ type: EmploymentDto })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.employmentService.findOne(id);
  }
  @Patch(':id')
  @Public()
  @ApiOkResponse({ type: EmploymentDto })
  async update(@Param('id', ParseObjectIdPipe) id: string,
    @Body() updateEmploymentDto: UpdateEmploymentDto) {
    return await this.employmentService.update(id, updateEmploymentDto);
  }
}

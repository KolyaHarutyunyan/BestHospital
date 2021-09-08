import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { Public, ParseObjectIdPipe } from '../util';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmploymentDto, CreateEmploymentDto } from './dto';

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

  @Get(':id')
  @Public()
  @ApiOkResponse({ type: EmploymentDto })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.employmentService.findOne(id);
  }
}

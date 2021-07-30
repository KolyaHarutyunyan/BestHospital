import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { CreateEmploymentDto } from './dto/create.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import { Public, ParseObjectIdPipe } from '../util';

@Controller('employment')
export class EmploymentController {
  constructor(private readonly employmentService: EmploymentService) { }

  @Post()
  @Public()
  async create(@Body() createEmploymentDto: CreateEmploymentDto) {
    return await this.employmentService.create(createEmploymentDto);
  }

  @Get()
  findAll() {
    return this.employmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmploymentDto: UpdateEmploymentDto) {
    return this.employmentService.update(+id, updateEmploymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employmentService.remove(+id);
  }
}

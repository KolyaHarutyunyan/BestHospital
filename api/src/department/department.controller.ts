import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../util';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, DepartmentDto } from './dto';

@Controller('department')
@ApiTags('Department Endpoints')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @Public()
  @ApiOkResponse({type: DepartmentDto})
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  // @Get()
  // findAll() {
  //   return this.departmentService.findAll();
  // }

  @Get(':id')
  @Public()
  @ApiOkResponse({type: DepartmentDto})
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.departmentService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
  //   return this.departmentService.update(+id, updateDepartmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.departmentService.remove(+id);
  // }
}

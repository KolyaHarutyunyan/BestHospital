import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from '../util';
import { DepartmentService } from './department.service';
import { CreateDepartmentDTO, DepartmentDTO, UpdateDepartmentDTO } from './dto';

@Controller('department')
@ApiTags('Department Endpoints')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @Public()
  @ApiOkResponse({type: DepartmentDTO})
  create(@Body() createDepartmentDto: CreateDepartmentDTO) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({type: [DepartmentDTO]})
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({type: DepartmentDTO})
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  @Public()
  @ApiOkResponse({type: DepartmentDTO})
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateDepartmentDto: UpdateDepartmentDTO) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @Public()
  @ApiOkResponse({type: String})
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.departmentService.remove(id);
  }
}

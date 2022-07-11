import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { ParseObjectIdPipe } from '../util';
import { DepartmentService } from './department.service';
import { CreateDepartmentDTO, DepartmentDTO, UpdateDepartmentDTO } from './dto';

@Controller('department')
@ApiTags('Department Endpoints')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: DepartmentDTO })
  create(@Body() createDepartmentDto: CreateDepartmentDTO) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [DepartmentDTO] })
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: DepartmentDTO })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: DepartmentDTO })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDTO,
  ) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  // @Delete(':id')
  // @ApiHeader({ name: ACCESS_TOKEN })
  // @ApiOkResponse({ type: String })
  // remove(@Param('id', ParseObjectIdPipe) id: string) {
  //   return this.departmentService.remove(id);
  // }
}

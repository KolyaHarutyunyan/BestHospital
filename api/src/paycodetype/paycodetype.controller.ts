import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaycodetypeService } from './paycodetype.service';
import { CreatePayCodeTypeDTO, UpdatePayCodeTypeDTO, PayCodeTypeDTO } from './dto';
import { ParseObjectIdPipe } from '../util';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN/authN.constants';

@Controller('paycodetype')
@ApiTags('PayCodeType Endpoints')
export class PaycodetypeController {
  constructor(private readonly paycodetypeService: PaycodetypeService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: PayCodeTypeDTO})
  async create(@Body() createPaycodetypeDto: CreatePayCodeTypeDTO) {
    return await this.paycodetypeService.create(createPaycodetypeDto);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: [PayCodeTypeDTO]})
  async findAll() {
    return this.paycodetypeService.findAll();
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: PayCodeTypeDTO})
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.paycodetypeService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: PayCodeTypeDTO})
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updatePaycodetypeDto: UpdatePayCodeTypeDTO) {
    return await this.paycodetypeService.update(id, updatePaycodetypeDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({type: String})
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.paycodetypeService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaycodetypeService } from './paycodetype.service';
import { CreatePayCodeTypeDTO, UpdatePayCodeTypeDTO, PayCodeTypeDTO } from './dto';
import { ParseObjectIdPipe, Public } from 'src/util';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('paycodetype')
@ApiTags('PayCodeType Endpoints')
export class PaycodetypeController {
  constructor(private readonly paycodetypeService: PaycodetypeService) {}

  @Post()
  @Public()
  @ApiOkResponse({type: PayCodeTypeDTO})
  async create(@Body() createPaycodetypeDto: CreatePayCodeTypeDTO) {
    return await this.paycodetypeService.create(createPaycodetypeDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({type: [PayCodeTypeDTO]})
  async findAll() {
    return this.paycodetypeService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({type: PayCodeTypeDTO})
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.paycodetypeService.findOne(id);
  }

  @Patch(':id')
  @Public()
  @ApiOkResponse({type: PayCodeTypeDTO})
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updatePaycodetypeDto: UpdatePayCodeTypeDTO) {
    return await this.paycodetypeService.update(id, updatePaycodetypeDto);
  }

  @Delete(':id')
  @Public()
  @ApiOkResponse({type: String})
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.paycodetypeService.remove(id);
  }
}

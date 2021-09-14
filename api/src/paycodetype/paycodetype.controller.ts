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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaycodetypeDto: UpdatePaycodetypeDto) {
  //   return this.paycodetypeService.update(+id, updatePaycodetypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.paycodetypeService.remove(+id);
  // }
}

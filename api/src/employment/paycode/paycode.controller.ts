import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaycodeService } from './paycode.service';
import { CreatePaycodeDTO, UpdatePaycodeDTO, PayCodeDTO } from './dto';
import { Public } from '../../util';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('paycode')
@ApiTags("PayCode Endpoints")
export class PaycodeController {
  constructor(private readonly paycodeService: PaycodeService) {}

  @Post()
  @Public()
  @ApiOkResponse({ type: PayCodeDTO })
  async create(@Body() createPaycodeDto: CreatePaycodeDTO) {
    return await this.paycodeService.create(createPaycodeDto);
  }

  // @Get()
  // @Public()
  // @ApiOkResponse({ type: PayCodeDTO })
  // findAll() {
  //   return this.paycodeService.findAll();
  // }

  // @Get(':id')
  // @Public()
  // @ApiOkResponse({ type: PayCodeDTO })
  // findOne(@Param('id') id: string) {
  //   return this.paycodeService.findOne(id);
  // }

  // @Patch(':id')
  // @ApiOkResponse({ type: PayCodeDTO })
  // @Public()
  // update(@Param('id') id: string, @Body() updatePaycodeDto: UpdatePaycodeDTO) {
  //   return this.paycodeService.update(id, updatePaycodeDto);
  // }

  // @Delete(':id')
  // @Public()
  // @ApiOkResponse({ type: String })
  // remove(@Param('id') id: string) {
  //   return this.paycodeService.remove(id);
  // }
}

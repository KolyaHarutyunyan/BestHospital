import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaycodeService } from './paycode.service';
import { CreatePaycodeDTO, UpdatePayCodeDTO, PayCodeDTO } from './dto';
import { ParseObjectIdPipe, Public } from '../../util';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('paycode')
@ApiTags("PayCode Endpoints")
export class PaycodeController {
  constructor(private readonly paycodeService: PaycodeService) { }

  @Post()
  @Public()
  @ApiOkResponse({ type: PayCodeDTO })
  async create(@Body() createPaycodeDto: CreatePaycodeDTO) {
    return await this.paycodeService.create(createPaycodeDto);
  }

  @Get('employment/:employmentId')
  @Public()
  @ApiOkResponse({ type: [PayCodeDTO] })
  async findAllByEmployment(@Param('employmentId', ParseObjectIdPipe) employmentId: string) {
    return await this.paycodeService.findAllByEmployment(employmentId);
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ type: PayCodeDTO })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.paycodeService.findOne(id);
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: [PayCodeDTO] })
  async findAll() {
    return await this.paycodeService.findAll();
  }
  @Patch(':id')
  @ApiOkResponse({ type: PayCodeDTO })
  @Public()
  update(@Param('id') id: string, @Body() updatePaycodeDto: UpdatePayCodeDTO) {
    return this.paycodeService.update(id, updatePaycodeDto);
  }

  // @Delete(':id')
  // @Public()
  // @ApiOkResponse({ type: String })
  // remove(@Param('id') id: string) {
  //   return this.paycodeService.remove(id);
  // }
}

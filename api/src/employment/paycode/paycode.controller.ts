import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaycodeService } from './paycode.service';
import { CreatePaycodeDTO, UpdatePayCodeDTO, PayCodeDTO } from './dto';
import { ParseObjectIdPipe, Public } from '../../util';
import { ApiHeader, ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../../authN/authN.constants';

@Controller('paycode')
@ApiTags("PayCode Endpoints")
export class PaycodeController {
  constructor(private readonly paycodeService: PaycodeService) { }

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PayCodeDTO })
  async create(@Body() createPaycodeDto: CreatePaycodeDTO) {
    return await this.paycodeService.create(createPaycodeDto);
  }

  @Get('employment/:employmentId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [PayCodeDTO] })
  async findAllByEmployment(@Param('employmentId', ParseObjectIdPipe) employmentId: string) {
    return await this.paycodeService.findAllByEmployment(employmentId);
  }
  @Get('staff/:staffId')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [PayCodeDTO] })
  async findPayCodesByStaffId(@Param('staffId', ParseObjectIdPipe) staffId: string):Promise<PayCodeDTO[]> {
    return await this.paycodeService.findPayCodesByStaffId(staffId);
  }
  
  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PayCodeDTO })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.paycodeService.findOne(id);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [PayCodeDTO] })
  async findAll() {
    return await this.paycodeService.findAll();
  }

  @Patch(':id')
  @ApiOkResponse({ type: PayCodeDTO })
  @ApiHeader({ name: ACCESS_TOKEN })
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

import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { PaycodeService } from './paycode.service';
import { CreatePaycodeDTO, PayCodeDTO } from './dto';
import { ParseObjectIdPipe } from '../../util';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../../authN/authN.constants';

@Controller('paycode')
@ApiTags('PayCode Endpoints')
export class PaycodeController {
  constructor(private readonly paycodeService: PaycodeService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PayCodeDTO })
  async create(@Body() createPaycodeDto: CreatePaycodeDTO) {
    return await this.paycodeService.create(createPaycodeDto);
  }
  @Patch(':id/active')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PayCodeDTO })
  async active(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.paycodeService.active(id);
  }
  @Patch(':id/inActive')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: PayCodeDTO })
  async inActive(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.paycodeService.inActive(id);
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
  async findPayCodesByStaffId(
    @Param('staffId', ParseObjectIdPipe) staffId: string,
  ): Promise<PayCodeDTO[]> {
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
}

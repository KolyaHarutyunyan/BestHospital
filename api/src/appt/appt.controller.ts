import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { ParseObjectIdPipe, Public } from 'src/util';
import { ApptService } from './appt.service';
import { CreateApptDto, UpdateAppointmentDto, ApptDto, CreateRepeatDto, CreateDocDTO } from './dto';
import { AppointmentQueryDTO, AppointmentQuerySetEventStatusDTO } from './dto/appt.dto';

@Controller('appt')
@ApiTags('Appointment Endpoints')
export class ApptController {
  constructor(private readonly apptService: ApptService) { }

  @Post()
  @Public()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ApptDto })
  create(@Body() createAppointmentDto: CreateApptDto) {
    return this.apptService.create(createAppointmentDto);
  }
  /** add document*/
  @Post(':id/documents')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ApptDto })
  async addDocument(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CreateDocDTO,
  ): Promise<ApptDto> {
    return await this.apptService.addDocument(id, dto);
  }
  @Post('repeat/:id')
  @ApiHeader({ name: ACCESS_TOKEN })
  // @ApiOkResponse({ type: AppointmentDto })
  repeat(@Body() createRepeatDto: CreateRepeatDto, @Param('id') id: string) {
    return this.apptService.repeat(createRepeatDto, id);
  }
  /** render the appointment */
  @Patch(':id/render')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ApptDto })
  async render(@Param('id', ParseObjectIdPipe) id: string): Promise<ApptDto> {
    return await this.apptService.render(id);
  }
  /** complete the appointment */
  @Patch(':id/complete')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ApptDto })
  async complete(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<ApptDto> {
    return await this.apptService.complete(id);
  }
  /** cancel the appointment */
  @Patch(':id/cancel')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiQuery({ name: 'reason', required: false })
  @ApiOkResponse({ type: ApptDto })
  async cancel(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('reason') reason: string,
  ): Promise<ApptDto> {
    return await this.apptService.cancel(id, reason);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  findAll(@Query() filter: AppointmentQueryDTO) {
    return this.apptService.findAll(filter);
  }

  @Get(':clientId/client')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ApptDto })
  findClients(@Param('clientId', ParseObjectIdPipe) clientId: string) {
    return this.apptService.findClients(clientId);
  }

  @Get(':staffId/staff')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ApptDto })
  findStaff(@Param('staffId', ParseObjectIdPipe) staffId: string) {
    return this.apptService.findStaff(staffId);
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ApptDto })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.apptService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: ApptDto })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.apptService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  remove(@Param('id') id: string) {
    return this.apptService.remove(+id);
  }
}

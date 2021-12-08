import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN/authN.constants';
import { ParseObjectIdPipe } from 'src/util';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentDto, CreateRepeatDto } from './dto';
import { AppointmentQueryDTO, AppointmentQuerySetEventStatusDTO } from './dto/appointment.dto';

@Controller('appointment')
@ApiTags('Appointment Endpoints')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AppointmentDto })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }
  @Post('repeat/:id')
  @ApiHeader({ name: ACCESS_TOKEN })
  // @ApiOkResponse({ type: AppointmentDto })
  repeat(@Body() createRepeatDto: CreateRepeatDto, @Param('id') id: string) {
    return this.appointmentService.repeat(createRepeatDto, id);
  }
  /** set status */
  @Patch(':id/setStatus')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AppointmentDto })
  async setStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query() status: AppointmentQuerySetEventStatusDTO
  ): Promise<AppointmentDto> {
    const staff = await this.appointmentService.setStatus(
      id,
      status
    );
    return staff;
  }
  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  findAll(@Query() filter: AppointmentQueryDTO) {
    return this.appointmentService.findAll(filter);
  }

  @Get(':clientId/client')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AppointmentDto })
  findClients(@Param('clientId', ParseObjectIdPipe) clientId: string,) {
    return this.appointmentService.findClients(clientId);
  }

  @Get(':staffId/staff')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AppointmentDto })
  findStaff(@Param('staffId', ParseObjectIdPipe) staffId: string,) {
    return this.appointmentService.findStaff(staffId);
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AppointmentDto })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: AppointmentDto })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from 'src/util';
import { AppointmentStatus, EventStatus } from './appointment.constants';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentDto, CreateRepeatDto } from './dto';
import { AppointmentQueryDTO, AppointmentQuerySetEventStatusDTO } from './dto/appointment.dto';

@Controller('appointment')
@ApiTags('Appointment Endpoints')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  @Public()
  @ApiOkResponse({ type: AppointmentDto })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }
  @Post('repeat/:id')
  @Public()
  // @ApiOkResponse({ type: AppointmentDto })
  repeat(@Body() createRepeatDto: CreateRepeatDto, @Param('id') id: string) {
    return this.appointmentService.repeat(createRepeatDto, id);
  }
  /** set eventStatus */
  @Patch(':id/setEventStatus')
  @Public()
  @ApiQuery({ name: 'eventStatus', enum: EventStatus })
  @ApiOkResponse({ type: AppointmentDto })
  async setStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query() eventStatus: AppointmentQuerySetEventStatusDTO
  ): Promise<AppointmentDto> {
    console.log(eventStatus);
    const staff = await this.appointmentService.setStatus(
      id,
      eventStatus.eventStatus
    );
    return staff;
  }
  @Get()
  @Public()
  findAll(@Query() filter: AppointmentQueryDTO) {
    return this.appointmentService.findAll(filter);
  }

  @Get(':clientId')
  @Public()
  @ApiOkResponse({ type: AppointmentDto })
  findClients(@Param('clientId', ParseObjectIdPipe) clientId: string,) {
    return this.appointmentService.findClients(clientId);
  }

  @Get(':staffId')
  @Public()
  @ApiOkResponse({ type: AppointmentDto })
  findStaff(@Param('staffId', ParseObjectIdPipe) staffId: string,) {
    return this.appointmentService.findStaff(staffId);
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ type: AppointmentDto })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}

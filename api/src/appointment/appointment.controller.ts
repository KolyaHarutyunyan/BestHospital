import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe, Public } from 'src/util';
import { EventStatus } from './appointment.constants';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentDto, CreateRepeatDto } from './dto';
import { AppointmentQueryDTO } from './dto/appointment.dto';

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

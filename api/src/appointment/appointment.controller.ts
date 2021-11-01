import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/util';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentDto, CreateRepeatDto } from './dto';

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
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
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

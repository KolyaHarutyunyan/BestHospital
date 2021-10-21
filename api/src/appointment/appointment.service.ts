import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ClientService } from '../client/client.service';
import { AuthorizationserviceService } from '../client/authorizationservice/authorizationservice.service';
import { StaffService } from '../staff/staff.service';
import { PaycodeService } from '../employment/paycode/paycode.service';
import { AppointmentDto } from './dto';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly clientService: ClientService,
    private readonly authorizedService: AuthorizationserviceService,
    private readonly staffService: StaffService,
    private readonly payCodeService: PaycodeService) {
  }
  async create(dto: CreateAppointmentDto):Promise<any> {
    // const client = await this.clientService.findById(dto.client);
    // const authService = await this.authorizedService.
    // const client = await this.clientService.findById(dto.client);

    // const appointment = new this.model(

    // )

  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const client = await this.clientService.findById(dto.client);
    const authService: any = await this.authorizedService.getClient(dto.authorizedService);
    const staff = await this.staffService.findById(dto.staff);
    const staffPayCode = await this.payCodeService.findPayCodesByStaffId(staff.id);
    console.log(staffPayCode);

    // console.log(client, 'clientclient');
    // console.log(authService, 'authServiceauthService');
    if(client.id != authService.authorizationId.clientId){
      throw new HttpException(
        'Authorization Service is not Client authorization service',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const appointment = new this.model({
    //   client: client.id
    // })

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

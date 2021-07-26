import { ApiProperty } from '@nestjs/swagger';
import { AddressDTO } from '../../address';

export class StaffDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty({ required: false })
  middleName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ required: false })
  secondaryEmail: string;
  @ApiProperty()
  phone: string;
  @ApiProperty({ required: false })
  secondaryPhone: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  birthday: string;
  @ApiProperty()
  residency: string;
  @ApiProperty()
  ssn: number;
  // @ApiProperty({ type: AddressDTO })
  // address: AddressDTO;
}

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
  firstEmail: string;
  @ApiProperty({ required: false })
  secondEmail: string;
  @ApiProperty()
  firstNumber: string;
  @ApiProperty({ required: false })
  secondNumber: string;
  @ApiProperty()
  driveLicenze: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  birthday: string;
  @ApiProperty()
  residency: string;
  @ApiProperty()
  ssn: string;
  @ApiProperty({ type: AddressDTO })
  address: AddressDTO;
}

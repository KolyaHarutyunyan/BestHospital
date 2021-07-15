import { ApiProperty } from '@nestjs/swagger';
import { AddressDTO } from '../../address';

export class AdminDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  ssn: number;
  @ApiProperty()
  dl: string;
  @ApiProperty({ type: AddressDTO })
  address: AddressDTO;
}

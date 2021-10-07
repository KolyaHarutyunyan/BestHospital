import { ApiProperty } from '@nestjs/swagger';
import { AddressDTO } from '../../address';
import { LicenseDTO } from './license.dto';

export class StaffDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  service: Array<string>;
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
  birthday: Date;
  @ApiProperty()
  residency: string;
  @ApiProperty()
  ssn: number;
  @ApiProperty()
  status: number;
  @ApiProperty()
  termination: Object;
  @ApiProperty({ type: AddressDTO })
  address: AddressDTO;
  @ApiProperty({type: LicenseDTO})
  license: LicenseDTO;
}

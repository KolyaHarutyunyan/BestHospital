import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { AddressDTO } from '../../address';
import { LicenseDTO } from './license.dto';
import { StaffStatus } from '../staff.constants';

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
  @ApiProperty({ enum: StaffStatus })
  status: number;
  @ApiProperty()
  termination: Object;
  @ApiProperty({ type: AddressDTO })
  address: AddressDTO;
  @ApiProperty({ type: LicenseDTO })
  license: LicenseDTO;
  @ApiProperty({ type: Boolean })
  clinical: boolean;
}

export class StaffQueryDTO {
  @ApiProperty({ enum: StaffStatus })
  @IsEnum(StaffStatus)
  status: number;
}
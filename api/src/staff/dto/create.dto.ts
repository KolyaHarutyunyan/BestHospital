import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDTO } from 'src/authN';
import { AddressDTO } from '../../address';
import {LicenseDTO} from './license.dto';

export class CreateStaffDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty({ required: false })
  @IsString()
  middleName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty({ required: false })
  @IsString()
  secondaryEmail: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  phone: string;
  @ApiProperty({ required: false })
  @IsString()
  secondaryPhone: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gender: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  residency: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ssn: number;
  @ApiProperty({ type: AddressDTO })
  address: string;
  @ApiProperty({ type: LicenseDTO })
  @ValidateNested({ each: true })
  @Type(() => LicenseDTO)
  license: LicenseDTO;
  /** System set values */
  user: UserDTO;
}

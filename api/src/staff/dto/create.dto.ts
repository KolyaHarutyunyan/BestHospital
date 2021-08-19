import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { AddressDTO } from '../../address';
import { UserStatus } from '../staff.constants';

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
  @ApiProperty({ enum: UserStatus })
  @IsEnum(UserStatus)
  status: number;
  @ApiProperty({ type: AddressDTO })
  address: string;
}

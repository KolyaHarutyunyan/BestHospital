import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { UserStatus } from '../staff.constants';

export class EditStaffDTO {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty({ required: false })
  @IsString()
  middleName: string;
  @ApiProperty({ required: false })
  @IsString()
  lastName: string;
  @ApiProperty({ required: false })
  @IsString()
  email: string;
  @ApiProperty({ required: false })
  @IsString()
  secondaryEmail: string;
  @ApiProperty({ required: false })
  // @IsNotEmpty()
  // @IsPhoneNumber('US')
  phone: string;
  @ApiProperty({ required: false })
  @IsString()
  secondaryPhone: string;
  @ApiProperty({ required: false })
  @IsString()
  state: string;
  @ApiProperty({ required: false })
  @IsString()
  gender: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birthday: Date;
  @ApiProperty({ required: false })
  @IsString()
  residency: string;
  @ApiProperty({ required: false })
  @IsNumber()
  ssn: number;
  @ApiProperty({ enum: UserStatus, required: false })
  @IsEnum(UserStatus)
  status: number;
  @ApiProperty({ required: false })
  address: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

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
  @IsString()
  birthday: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  residency: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ssn: number;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // address: string;

}

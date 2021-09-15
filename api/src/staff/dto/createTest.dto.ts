import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { UserDTO } from 'src/authN';
import { AddressDTO } from '../../address';

export class CreateStaffDtoTest {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
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

  /** System set values */
  user: UserDTO;
}

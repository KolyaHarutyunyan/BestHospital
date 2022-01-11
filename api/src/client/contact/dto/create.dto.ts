import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { AddressDTO } from '../../../address';

export class CreateContactDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  relationship: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  phoneNumber: string;
  @ApiProperty({ type: AddressDTO })
  @IsNotEmpty()
  address: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { AddressDTO } from '../../../address';

export class UpdateContactDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  relationship: string;
  @ApiProperty()
  @IsPhoneNumber('US')
  @IsString()
  phoneNumber: string;
  @ApiProperty({ type: AddressDTO })
  @IsOptional()
  address: string;
}

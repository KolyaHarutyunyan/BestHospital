import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { UserDTO } from 'src/authN';
import { AddressDTO } from '../../address';
import { FundingStatus } from '../funding.constants';

export class UpdateFundingDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  type: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  contact: string;
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  website: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  phoneNumber: string;
  @ApiProperty({ type: AddressDTO })
  @IsOptional()
  address: string;
  @ApiProperty({ enum: FundingStatus })
  @IsEnum(FundingStatus)
  status: number;
  user: UserDTO;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { UserDTO } from '../../authN/dto/user.dto';
import { FundingStatus } from '../funding.constants';

export class CreateFundingDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contact: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  website: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  phoneNumber: string;
  @ApiProperty()
  address: string;
  @ApiProperty({ enum: FundingStatus })
  @IsEnum(FundingStatus)
  status: number;
  user: UserDTO;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDTO } from 'src/authN';
import { AddressDTO } from '../../address';
import { FundingStatus, TypeStatus } from '../funding.constants';

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
export class UpdateServiceDto {
  @ApiProperty()
  globServiceId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rate: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cptCode: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  size: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  min: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  max: number;
  user: UserDTO;
}
export class UpdateModifierDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  credentialId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ enum: TypeStatus })
  @IsEnum(TypeStatus)
  type: number;
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
export class UpdateModifiersDto {
  @ApiProperty({ type: [UpdateModifierDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateModifierDto)
  modifiers: UpdateModifierDto[];
}

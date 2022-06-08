import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { DTO } from '../../util';
import { AddressDTO } from '../../address';
import { FundingStatus, FundingType, TypeStatus } from '../funding.constants';

export class UpdateFundingDto extends DTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty({ enum: FundingType })
  @IsEnum(FundingType)
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
  @IsUrl()
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
}
export class UpdateServiceDto extends DTO {
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
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  chargeRate: number;
  @ApiProperty()
  @IsOptional()
  credentialId: string;
}
export class UpdateModifierDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  chargeRate: number;
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
  @IsNotEmpty()
  type: string;
}
export class UpdateModifiersDto {
  @ApiProperty()
  modifiers: UpdateModifierDto;
}

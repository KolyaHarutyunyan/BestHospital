import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import { DTO } from '../../util';
import { FundingStatus, FundingType, TypeStatus } from '../funding.constants';
export class CreateFundingDTO extends DTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ enum: FundingType })
  @IsEnum(FundingType)
  type: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  contact: string;
  @ApiProperty()
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
  @ApiProperty()
  address: string;
  @ApiProperty({ enum: FundingStatus })
  @IsEnum(FundingStatus)
  status: number;
}
export class CreateServiceDTO extends DTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  serviceId: string;
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
  @IsOptional()
  credentialId: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  chargeRate: number;
}
export class CreateModifierDto {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  credentialId: string;
  @ApiProperty()
  @IsNumber()
  @Min(1)
  chargeRate: number;
  @ApiProperty()
  @IsString()
  @Length(1, 5)
  name: string;
  @ApiProperty({ enum: TypeStatus })
  @IsEnum(TypeStatus)
  type: string;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
export class CreateModifierDTO {
  @ApiProperty({ type: CreateModifierDto })
  modifier: CreateModifierDto;
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  serviceId: string;
}

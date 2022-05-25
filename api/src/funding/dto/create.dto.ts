import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
  ValidateNested,
} from 'class-validator';
import { UserDTO } from '../../authN/dto/user.dto';
import { FundingStatus, TypeStatus } from '../funding.constants';

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
export class CreateServiceDTO {
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
  user: UserDTO;
}
export class CreateModifierDto {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  credentialId: string;
  @ApiProperty()
  @IsNumber()
  chargeRate: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty({ enum: TypeStatus })
  @IsEnum(TypeStatus)
  type: number;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
export class CreateModifiersDTO {
  @ApiProperty({ type: [CreateModifierDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateModifierDto)
  modifiers: CreateModifierDto[];
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  serviceId: string;
}

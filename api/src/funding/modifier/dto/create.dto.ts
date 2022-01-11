import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TypeStatus } from '../../funding.constants';

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

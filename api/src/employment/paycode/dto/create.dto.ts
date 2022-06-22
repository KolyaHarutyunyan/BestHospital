import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreatePaycodeDTO {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  employmentId: string;
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  payCodeTypeId: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  rate: number;
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;
}

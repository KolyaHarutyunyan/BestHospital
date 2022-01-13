import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePayCodeDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  employmentId: string;
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  payCodeTypeId: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  rate: number;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  active: boolean;
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  startDate: Date;
  @ApiProperty()
  @IsOptional()
  endDate?: Date;
}

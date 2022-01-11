import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTimesheetDTO {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  staffId: string;
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  payCode: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  hours: number;
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endDate: Date;
  totalAmount?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
} from 'class-validator';
import { ApptMode } from '../appt.constants';

export class CreateRepeatDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
  @ApiProperty({ enum: ApptMode })
  @IsEnum(ApptMode)
  @IsNotEmpty()
  mode: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  repeatCount: number;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  repeatConsecutive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  repeatCountWeek: number;
  @ApiProperty()
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @IsOptional()
  repeatCheckWeek: Array<number>;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Max(31)
  @IsOptional()
  repeatDayMonth: number;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Max(12)
  @IsOptional()
  repeatMonth: number;
}

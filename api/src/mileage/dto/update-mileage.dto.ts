import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateMileageDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  compensation: number;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate: Date;
}

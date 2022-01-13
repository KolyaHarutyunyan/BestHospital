import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTerminationDto {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date: Date;
  @ApiProperty()
  @IsString()
  @IsOptional()
  reason: string;
}

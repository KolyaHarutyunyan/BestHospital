import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class TerminationDTO {
  @ApiProperty()
  reason: string;
  @ApiProperty()
  @IsDateString()
  date: Date;
}

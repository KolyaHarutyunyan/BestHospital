import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TerminationDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;
  @ApiProperty()
  @IsString()
  date: string;
}

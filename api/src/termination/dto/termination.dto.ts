import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TerminationDTO {
  @ApiProperty()
  reason: string;
  @ApiProperty()
  date: string;
}

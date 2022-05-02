import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenerateClaimDto {
  @ApiProperty()
  @IsString({ each: true })
  bills: string[];
}

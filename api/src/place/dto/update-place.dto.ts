import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Max } from 'class-validator';

export class UpdatePlaceDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  code: string;
}

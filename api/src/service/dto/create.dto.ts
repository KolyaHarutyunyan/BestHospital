import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  displayCode: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;
}

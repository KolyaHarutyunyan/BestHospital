export class CreateAuthorizationserviceDto {}
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateAuthorizationServiceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // completed: number;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // available: number;
  @ApiProperty()
  @IsOptional()
  @IsArray()
  modifiers: Array<string>;
}

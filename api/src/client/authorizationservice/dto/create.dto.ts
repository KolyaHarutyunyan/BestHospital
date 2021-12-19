export class CreateAuthorizationserviceDto { }
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateAuthorizationServiceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;
  @ApiProperty()
  @IsOptional()
  @IsArray()
  modifiers: Array<string>;
}

export class AuthorizationModifiersDTO {
  @ApiProperty()
  @IsArray()
  modifiers: Array<string>;
}

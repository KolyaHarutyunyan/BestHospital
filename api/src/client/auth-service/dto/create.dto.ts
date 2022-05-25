export class CreateAuthorizationserviceDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAuthServiceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;
  @ApiProperty()
  @IsOptional()
  @IsArray()
  modifiers: Array<string>;
}

export class AuthModifiersDTO {
  @ApiProperty()
  @IsArray()
  modifiers: Array<string>;
}

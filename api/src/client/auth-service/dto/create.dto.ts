export class CreateAuthorizationserviceDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAuthServiceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  default: boolean;
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

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class UpdateAuthServiceDTO {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  total: number;
  @ApiProperty()
  @IsMongoId()
  authorizationId: string;
  @ApiProperty()
  @IsMongoId()
  fundingServiceId: string;
  @ApiProperty()
  @IsArray()
  modifiers: Array<string>;
}

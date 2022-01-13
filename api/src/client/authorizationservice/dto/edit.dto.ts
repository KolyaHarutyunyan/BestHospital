import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class UpdateAuthorizationserviceDTO {
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
}

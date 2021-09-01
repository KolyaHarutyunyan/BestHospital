import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateCredentialDTO {
  @ApiProperty()
  credentialId?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expirationDate: Date;
}
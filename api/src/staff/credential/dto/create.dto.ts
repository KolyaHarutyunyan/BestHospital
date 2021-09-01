import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCredentialDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  staffId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  credentialId: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expirationDate: Date;
}
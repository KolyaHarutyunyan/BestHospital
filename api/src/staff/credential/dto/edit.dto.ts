import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SUpdateCredentialDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  credentialId?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expirationDate: Date;
  @ApiProperty()
  @IsString()
  receiveData: string
}
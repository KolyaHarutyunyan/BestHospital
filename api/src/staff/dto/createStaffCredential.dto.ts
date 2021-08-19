import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { MongooseUtil, ParseObjectIdPipe } from '../../util';

export class CreateStaffCredentialDto {
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
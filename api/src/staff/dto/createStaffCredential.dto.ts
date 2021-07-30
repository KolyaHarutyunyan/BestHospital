import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { MongooseUtil, ParseObjectIdPipe } from '../../util';

export class CreateStaffCredentialDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty()
  @IsString()
  credentialId: string;
  @ApiProperty({ required: false })
  expirationDate?: string;
}
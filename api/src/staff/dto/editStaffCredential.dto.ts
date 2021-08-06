import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { MongooseUtil, ParseObjectIdPipe } from '../../util';

export class EditStaffCredentialDTO {
  @ApiProperty()
  credentialId?: string;
  @ApiProperty({ required: false })
  expirationDate?: string;
}
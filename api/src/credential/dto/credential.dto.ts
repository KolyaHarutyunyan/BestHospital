import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import {CredentialsStatus} from '../credential.constants';

export class CredentialDTO {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ enum: CredentialsStatus })
  @IsEnum(CredentialsStatus)
  type: number
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator';
import { ClientStatus } from '../client.constants';

export class ClientDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  middleName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  ethnicity: string;
  @ApiProperty()
  language: string;
  @ApiProperty()
  familyLanguage: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  birthday: Date;
  @ApiProperty()
  enrollment?: string;
  @ApiProperty({ enum: ClientStatus })
  status: string;
  @ApiProperty()
  termination: Object;
}

export class ClientQueryDTO {
  @ApiProperty({ enum: ClientStatus })
  @IsEnum(ClientStatus)
  status: string;
}

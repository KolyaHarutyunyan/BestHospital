import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ClientStatus } from '../client.constants';
import { ITermination } from '../../termination/interface';

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
  termination: ITermination;
}

export class ClientQueryDTO {
  @ApiProperty({ enum: ClientStatus })
  @IsEnum(ClientStatus)
  status: string;
}

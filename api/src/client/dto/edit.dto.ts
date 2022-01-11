import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserDTO } from '../../authN';

export class UpdateClientDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  middleName: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  code: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  ethnicity: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  language: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  familyLanguage: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  gender: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthday: Date;
  user: UserDTO;
}

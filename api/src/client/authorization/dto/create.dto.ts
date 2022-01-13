export class CreateAuthorizationDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AuthorizationStatus } from '../authorization.constants';

export class CreateAuthorizationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  authId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;
  @ApiProperty({ enum: AuthorizationStatus })
  @IsEnum(AuthorizationStatus)
  status: number;
}

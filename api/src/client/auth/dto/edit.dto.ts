export class CreateAuthorizationDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { AuthorizationStatus } from '../auth.constants';

export class UpdateAuthDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  authId: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate: Date;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate: Date;
  @ApiProperty()
  @IsString()
  @IsOptional()
  location: string;
  @ApiProperty({ enum: AuthorizationStatus })
  @IsEnum(AuthorizationStatus)
  @IsOptional()
  status: string;
}

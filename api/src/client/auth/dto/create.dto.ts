export class CreateAuthorizationDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileDTO } from '../../../files/dto';
import { DTO } from '../../../util';
import { AuthorizationStatus } from '../auth.constants';

export class CreateAuthDTO {
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
  status: string;
}
export class CreateDocDTO extends DTO {
  @ApiProperty({ type: FileDTO })
  file: FileDTO;
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}

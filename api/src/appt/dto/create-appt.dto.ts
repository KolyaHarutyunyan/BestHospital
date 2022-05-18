import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApptStatus, ApptType, EventStatus } from '../appt.constants';

export class CreateApptDto {
  @ApiProperty({ enum: ApptType })
  @IsNotEmpty()
  @IsEnum(ApptType)
  type: string;
  @ApiProperty()
  @IsMongoId()
  @IsString()
  @IsOptional()
  client: string;
  @ApiProperty()
  @IsMongoId()
  @IsString()
  @IsOptional()
  authorizedService: string;
  @ApiProperty()
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  staff: string;
  @ApiProperty()
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  staffPayCode: string;
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  placeService: string;
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startTime: Date;
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endTime: Date;
  @ApiProperty({ enum: ApptStatus })
  @IsEnum(ApptStatus)
  status: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  require: boolean;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  miles?: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  signature: boolean;
}

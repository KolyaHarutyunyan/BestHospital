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

export class UpdateAppointmentDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsEnum(AppointmentType)
  // type: string;
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  client: string;
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  authorizedService: string;
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  placeService: string;
  @ApiProperty()
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  staff: string;
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  staffPayCode: string;
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
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
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

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ScheduleStatus } from '..';
import { TerminationDTO, CreateTerminationDto } from '../../termination';

export class CreateEmploymentDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  staffId: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  departmentId?: string;
  @ApiProperty()
  @IsMongoId()
  supervisor: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endDate: Date;
  @ApiProperty({ enum: ScheduleStatus })
  @IsEnum(ScheduleStatus)
  schedule: number;
  @ApiProperty({ enum: ScheduleStatus })
  @IsEnum(ScheduleStatus)
  type: string;
  @ApiProperty({ type: TerminationDTO })
  termination: CreateTerminationDto;
}

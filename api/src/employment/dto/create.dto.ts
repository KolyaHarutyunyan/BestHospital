import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ScheduleStatus } from '..';
import { TerminationDTO, CreateTerminationDto } from '../../termination';
import { EmploymentType } from '../employment.constants';

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
  @IsOptional()
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
  @ApiProperty({ enum: EmploymentType })
  @IsEnum(EmploymentType)
  type: string;
}

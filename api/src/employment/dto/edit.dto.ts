import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ScheduleStatus } from '..';
import { TerminationDTO, CreateTerminationDto } from '../../termination';
import { EmploymentType } from '../employment.constants';

export class UpdateEmploymentDto {
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  title: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  @IsOptional()
  departmentId?: string;
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  supervisor: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate: Date;
  @ApiProperty()
  @IsOptional()
  endDate: Date;
  @ApiProperty({ enum: ScheduleStatus })
  @IsEnum(ScheduleStatus)
  @IsOptional()
  schedule: number;
  @ApiProperty({ enum: EmploymentType })
  @IsEnum(EmploymentType)
  @IsOptional()
  type: string;
  @ApiProperty({ type: TerminationDTO })
  @IsOptional()
  termination: CreateTerminationDto;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ScheduleStatus } from '..';
import { TerminationDTO, CreateTerminationDto } from '../../termination';
import { EmploymentType } from '../employment.constants';

export class EmploymentDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  staffId: string;
  @ApiProperty()
  supervisor: string;
  @ApiProperty({ required: false })
  departmentId?: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty({ type: Boolean })
  active: boolean;
  @ApiProperty({ enum: ScheduleStatus })
  @IsEnum(ScheduleStatus)
  schedule: number;
  @ApiProperty({ enum: EmploymentType })
  type: string;
  @ApiProperty({ type: TerminationDTO })
  termination: CreateTerminationDto;
}

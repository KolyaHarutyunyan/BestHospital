import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ScheduleStatus } from "..";
import { TerminationSchema } from '../../termination';
import { TerminationDTO } from '../../termination';

export class EmploymentDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    supervisor: string;
    @ApiProperty({ required: false })
    departmentId?: string;
    @ApiProperty()
    date?: string
    @ApiProperty({ enum: ScheduleStatus })
    @IsEnum(ScheduleStatus)
    schedule: number;
    @ApiProperty({ type: TerminationDTO })
    termination: TerminationDTO;
}
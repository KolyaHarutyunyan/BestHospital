import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { ScheduleStatus } from "..";
import { TerminationSchema } from '../../termination';
import { TerminationDTO } from '../../termination';

export class CreateEmploymentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;
    @ApiProperty()
    departmentId: string;
    @ApiProperty()
    @IsString()
    supervisor: string;
    @ApiProperty()
    date?: string
    @ApiProperty({ enum: ScheduleStatus })
    @IsEnum(ScheduleStatus)
    schedule: number;
    @ApiProperty({ type: TerminationDTO })
    termination: TerminationDTO;
}

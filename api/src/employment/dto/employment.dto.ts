import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ScheduleStatus } from "..";
import { TerminationDTO, CreateTerminationDto } from '../../termination';

export class EmploymentDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    staffId:string;
    @ApiProperty()
    supervisor: string;
    @ApiProperty({ required: false })
    departmentId?: string;
    @ApiProperty()
    startDate: Date
    @ApiProperty()
    endDate: Date;
    @ApiProperty({type: Boolean})
    active: Boolean;
    @ApiProperty({ enum: ScheduleStatus })
    @IsEnum(ScheduleStatus)
    schedule: number;
    @ApiProperty({ type: TerminationDTO })
    termination: CreateTerminationDto;
}
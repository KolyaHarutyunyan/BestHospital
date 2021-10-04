import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ScheduleStatus } from "..";
import { TerminationSchema } from '../../termination';
import { TerminationDTO, CreateTerminationDto } from '../../termination';

export class UpdateEmploymentDto {
    @ApiProperty()
    @IsString()
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
    @IsDateString()
    @IsOptional()
    date: Date;
    @ApiProperty({ enum: ScheduleStatus })
    @IsEnum(ScheduleStatus)
    @IsOptional()
    schedule: number;
    @ApiProperty({ type: TerminationDTO })
    @IsOptional()
    termination: CreateTerminationDto;
}

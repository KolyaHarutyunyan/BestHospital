import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ScheduleStatus } from "..";
import { TerminationSchema } from '../../termination';
import { TerminationDTO, CreateTerminationDto } from '../../termination';

export class CreateEmploymentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    staffId: string;
    @ApiProperty({ required: false })
    // @IsMongoId()
    @IsOptional() @IsMongoId() @IsNotEmpty()
    departmentId?: string;
    @ApiProperty()
    @IsMongoId()
    supervisor: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startDate: Date
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    endDate: Date;
    @ApiProperty({ enum: ScheduleStatus })
    @IsEnum(ScheduleStatus)
    schedule: number;
    @ApiProperty({ type: TerminationDTO })
    termination: CreateTerminationDto;
}

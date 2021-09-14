import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ScheduleStatus } from "..";
import { TerminationSchema } from '../../termination';
import { TerminationDTO, CreateTerminationDto } from '../../termination';

export class CreateEmploymentDto {
    @ApiProperty()
    @IsMongoId()
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
    date: Date;
    @ApiProperty({ enum: ScheduleStatus })
    @IsEnum(ScheduleStatus)
    schedule: number;
    @ApiProperty({ type: TerminationDTO })
    termination: CreateTerminationDto;
}

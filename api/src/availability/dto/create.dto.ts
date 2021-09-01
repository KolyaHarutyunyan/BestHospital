import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ScheduleStatus } from '../availability.constants';

export class CreateAvailabilityDTO {
    @IsArray()
    @IsOptional()
    monday: Array<Object>
    @IsArray()
    @IsOptional()
    tuesday: Array<Object>
    // @ApiProperty({ enum: ScheduleStatus })
    // @IsEnum(ScheduleStatus)
    // @IsNotEmpty()
    // onModel: String
}

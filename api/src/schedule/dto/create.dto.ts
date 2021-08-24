import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ScheduleStatus } from '../schedule.constants';

export class CreateScheduleDTO {
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

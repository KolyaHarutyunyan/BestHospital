import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ScheduleStatus } from '../availability.constants';

export class CreateAvailabilityDTO {
    @IsArray()
    @IsOptional()
    @ApiProperty()
    monday: Array<Object>
    @IsArray()
    @IsOptional()
    @ApiProperty()
    tuesday: Array<Object>
    // @ApiProperty({ enum: ScheduleStatus })
    // @IsEnum(ScheduleStatus)
    // @IsNotEmpty()
    // onModel: String
}

// export class AvailableTypeDTO {
//     from: string,
//     to
// }

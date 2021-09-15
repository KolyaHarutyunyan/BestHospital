import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ScheduleStatus } from '../availability.constants';

export class AvailableTypeDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    from: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    to: number;
    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    available: boolean;
}

export class CreateAvailabilityDTO {
    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [AvailableTypeDTO] })
    monday: Array<AvailableTypeDTO>
    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [AvailableTypeDTO] })
    tuesday: Array<AvailableTypeDTO>
    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [AvailableTypeDTO] })
    wednesday: Array<AvailableTypeDTO>
    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [AvailableTypeDTO] })
    thursday: Array<AvailableTypeDTO>
    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [AvailableTypeDTO] })
    friday: Array<AvailableTypeDTO>
    // @ApiProperty({ enum: ScheduleStatus })
    // @IsEnum(ScheduleStatus)
    // @IsNotEmpty()
    // onModel: string;
}


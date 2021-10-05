import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import {OvertimeStatus} from '../overtime.constants';

export class UpdateOvertimeDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;
    @ApiProperty({ enum: OvertimeStatus })
    @IsEnum(OvertimeStatus)
    @IsOptional()
    type: string;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    multiplier: number;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    threshold: number;
}

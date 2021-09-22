import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import {OvertimeStatus} from '../overtime.constants';

export class CreateOvertimeDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({ enum: OvertimeStatus })
    @IsEnum(OvertimeStatus)
    type: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    multiplier: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    threshold: string;
}

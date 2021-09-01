import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateTerminationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date: Date
    @ApiProperty()
    @IsString()
    @IsOptional()
    reason: string
}

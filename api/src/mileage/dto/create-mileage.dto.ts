import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateMileageDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    compensation: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startDate: Date;
}

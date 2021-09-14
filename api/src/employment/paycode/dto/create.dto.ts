import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreatePaycodeDTO {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    employmentId: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    payCodeTypeId: string;
    @IsNumber()
    @IsNotEmpty()
    rate: number;
    @IsBoolean()
    @IsNotEmpty()
    active: boolean;
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;
    @IsDateString()
    @IsOptional()
    endDate?: Date;
}

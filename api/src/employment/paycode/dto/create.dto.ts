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
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    rate: number;
    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    active: boolean;
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    endDate?: Date;
}

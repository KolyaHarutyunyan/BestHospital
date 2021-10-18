import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdatePayCodeDTO {
    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    employmentId: string;
    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    payCodeTypeId: string;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    rate: number;
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    active: boolean;
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    startDate: Date;
    @ApiProperty()
    // @IsDateString()
    @IsOptional()
    endDate?: Date;
}
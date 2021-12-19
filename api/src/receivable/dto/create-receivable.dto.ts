import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsMongoId, IsNotEmpty, IsNumber } from "class-validator"

export class CreateReceivableDto {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    placeService: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cptCode: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    totalUnits: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    totalBill: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()   
    renderProvider: number;
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    dateOfService: any;
    @ApiProperty()
    bills: string[]
}


import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer";
import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"

export class GenerateClaimDto {
    @ApiProperty()
    @IsString({ each: true })
    bills: string[];
}
import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class GenerateInvoiceDto {
    @ApiProperty()
    @IsString({ each: true })
    bills: string[];
}
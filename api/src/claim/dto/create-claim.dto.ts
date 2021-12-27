import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateClaimDto {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    client: string
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    staff: string
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    funder: string
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    totalCharge: number
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ammountPaid: number
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    paymentRef: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    link: string
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    dateRange: Date
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    createdDate: Date
    @ApiProperty()
    receivable: string[]
}

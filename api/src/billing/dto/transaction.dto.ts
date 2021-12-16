import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TransactionType } from "../billing.constants";

export class TransactionDto {
    @ApiProperty({ enum: TransactionType })
    @IsEnum(TransactionType)
    type: string;
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date: Date;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    paymentRef: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    creator: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    note: string;
    status: string;
}

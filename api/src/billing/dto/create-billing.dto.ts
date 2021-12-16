import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ClaimStatus, InvoiceStatus, BillingStatus, TransactionType } from "../billing.constants";

export class CreateBillingDto {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    appointment: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    client: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    staff: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    payer: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    authorization: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    authService: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    placeService: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    totalHours: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    totalUnits: number;
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    dateOfService: Date;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    billedAmount: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    billedRate: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    payerTotal: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    payerPaid: number;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    clientResp?: number;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    clientPaid?: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    balance: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    location: string
    @ApiProperty({enum: ClaimStatus})
    @IsEnum(ClaimStatus)
    claimStatus: string
    @ApiProperty({enum: InvoiceStatus})
    @IsEnum(InvoiceStatus)
    invoiceStatus: string
    @ApiProperty({enum: BillingStatus})
    @IsEnum(BillingStatus)
    status: string
    @ApiProperty()
    transaction?: any;
}

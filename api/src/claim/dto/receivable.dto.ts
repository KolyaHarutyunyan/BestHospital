import { ApiProperty } from "@nestjs/swagger"

export class ReceivableDto {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    placeService: string;
    @ApiProperty()
    cptCode: number;
    @ApiProperty()
    totalUnits: number;
    @ApiProperty()
    totalBill: number;
    @ApiProperty()
    renderProvider?: number;
    @ApiProperty()
    dateOfService: Object;
    @ApiProperty()
    status?: string;
    @ApiProperty()
    createdAt?: Date;
    @ApiProperty()
    bills: string[]
}

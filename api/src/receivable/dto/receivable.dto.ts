import { ApiProperty } from "@nestjs/swagger";

export class ReceivableDto {
    @ApiProperty()
    _id: string;
    placeService: string;
    cptCode: number;
    totalUnits: number;
    totalBill: number;
    renderProvider: number;
    dateOfService: Date;
    status: string;
    bills: any;
}

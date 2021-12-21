import { ApiProperty } from "@nestjs/swagger"
import { ReceivableDto } from './receivable.dto';

export class ClaimDto {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    client: string
    @ApiProperty()
    staff: string
    @ApiProperty()
    funder: string
    @ApiProperty()
    totalCharge: number
    @ApiProperty()
    ammountPaid: number
    @ApiProperty()
    submittedDate: Date
    @ApiProperty()
    paymentRef: string
    @ApiProperty()
    link: string
    @ApiProperty()
    status: string
    @ApiProperty()
    details: string
    @ApiProperty()
    date: Date
    @ApiProperty()
    createdDate: Date
    @ApiProperty()
    receivable: ReceivableDto;
}
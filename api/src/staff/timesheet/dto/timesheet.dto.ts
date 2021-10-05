import { ApiProperty } from "@nestjs/swagger";

export class TimeSheetDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    staffId: string;
    @ApiProperty()
    payCode: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    hours: number;
    @ApiProperty()
    amount:number;
    @ApiProperty()
    startDate: Date
    @ApiProperty()
    endDate: Date;
    @ApiProperty()
    createdDate: Date;
}

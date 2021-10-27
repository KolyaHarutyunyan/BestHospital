import { ApiProperty } from "@nestjs/swagger";

export class MileageDTO {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    compensation: number;
    @ApiProperty()
    startDate: Date;
    @ApiProperty()
    endDate: Date;
}

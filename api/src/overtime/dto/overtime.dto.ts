import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { PayCodeTypeStatus } from '../../paycodetype/paycodetypes.constants';

export class OvertimeDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty({ enum: PayCodeTypeStatus })
    @IsEnum(PayCodeTypeStatus)
    type: string;
    @ApiProperty()
    multiplier: number;
    @ApiProperty()
    threshold: number;
}

import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { PayCodeTypeStatus } from '../../paycodetype/paycodetypes.constants';

export class CreateOvertimeDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({ enum: PayCodeTypeStatus })
    @IsEnum(PayCodeTypeStatus)
    type: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    multiplier: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    threshold: string;
}

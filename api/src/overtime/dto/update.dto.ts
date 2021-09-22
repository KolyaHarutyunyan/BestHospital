import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { PayCodeTypeStatus } from '../../paycodetype/paycodetypes.constants';

export class UpdateOvertimeDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;
    @ApiProperty({ enum: PayCodeTypeStatus })
    @IsEnum(PayCodeTypeStatus)
    @IsOptional()
    type: string;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    multiplier: number;
    @ApiProperty()
    @IsString()
    @IsOptional()
    threshold: string;
}

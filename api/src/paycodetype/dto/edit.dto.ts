import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PayCodeTypeStatus } from "../paycodetypes.constants";

export class UpdatePayCodeTypeDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    code: string;
    @ApiProperty({ enum: PayCodeTypeStatus })
    @IsEnum(PayCodeTypeStatus)
    @IsOptional()
    type: string;
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    overtime: boolean;
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    pto: boolean;
}

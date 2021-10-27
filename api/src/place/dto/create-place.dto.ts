import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Max } from "class-validator";

export class CreatePlaceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    code: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDepartmentDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string
}

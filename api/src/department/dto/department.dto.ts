import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DepartmentDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
}

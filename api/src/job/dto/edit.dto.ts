import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateJobDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string
}

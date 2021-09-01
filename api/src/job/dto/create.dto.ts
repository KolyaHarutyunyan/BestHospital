import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateJobDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string
}

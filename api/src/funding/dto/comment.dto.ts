import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    text: string;
}

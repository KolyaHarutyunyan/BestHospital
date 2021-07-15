import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class CreateCommentDTO {

    @ApiProperty()
    @IsNotEmpty()
    text: string;
}


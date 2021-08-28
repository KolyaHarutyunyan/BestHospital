import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { CommentStatus } from '../comment.constants';

export class UpdateCommentDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    text: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    subject: string;
}
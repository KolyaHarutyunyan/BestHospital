import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { CommentStatus } from '../comment.constants';

export class CreateCommentDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    text: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subject: string;
    @IsMongoId()
    @ApiProperty()
    resource: string;
    @ApiProperty({ enum: CommentStatus })
    @IsEnum(CommentStatus)
    onModel: string;
    // @IsMongoId()
    // @ApiProperty()
    // user: string;
}
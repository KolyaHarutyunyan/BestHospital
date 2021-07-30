import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
    @ApiProperty()
    text: string;
    @ApiProperty()
    funder: string;
    @ApiProperty()
    user: string;
    @ApiProperty()
    created: Date;
}
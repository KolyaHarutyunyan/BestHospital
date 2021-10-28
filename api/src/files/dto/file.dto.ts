import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class FileDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    resource: string;
    @ApiProperty()
    type: string;
    @ApiProperty()
    url: string;
    @ApiProperty()
    mimetype: string;
    @ApiProperty()
    size: number;
    @ApiProperty()
    name: string;
}

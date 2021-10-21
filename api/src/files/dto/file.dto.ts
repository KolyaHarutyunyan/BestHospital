import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { FileStatus, FileType } from '../constants';

export class FileDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    resource: string;
    @ApiProperty({ enum: FileType })
    @IsEnum(FileType)
    type: string;
    @ApiProperty()
    url: string;
    @ApiProperty({ enum: FileStatus })
    onModel: string;
}

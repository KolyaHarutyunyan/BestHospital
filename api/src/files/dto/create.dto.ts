import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsUrl } from 'class-validator';
import { FileType, FileStatus } from '../constants';

export class CreateImageDTO {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    resource: string;
    @ApiProperty({ enum: FileType })
    @IsEnum(FileType)
    @IsNotEmpty()
    type: string;
    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    url: string;
    @ApiProperty({ enum: FileStatus })
    @IsEnum(FileStatus)
    @IsNotEmpty()
    onModel: string;
}

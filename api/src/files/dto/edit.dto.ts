import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUrl } from 'class-validator';
import { FileType } from '../constants';

export class EditImageDTO {
    @ApiProperty({ enum: FileType })
    @IsEnum(FileType)
    @IsOptional()
    type: string;
    @ApiProperty()
    @IsUrl()
    @IsOptional()
    url: string;
}

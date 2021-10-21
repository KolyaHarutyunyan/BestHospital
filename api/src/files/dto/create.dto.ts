import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsUrl, Max } from 'class-validator';
import { FileStatus } from '../constants';

export class CreateImageDTO {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    resource: string;
    @ApiProperty()
    @IsNotEmpty()
    type: string;
    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    url: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, IsUrl, Max } from 'class-validator';
import { FileStatus } from '../constants';

export class CreateImageDTO {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    resource: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mimetype: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    size: number;
    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    url: string;
}

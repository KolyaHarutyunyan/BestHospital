import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class EditImageDTO {
    @ApiProperty()
    @IsOptional()
    type: string;
    @ApiProperty()
    @IsUrl()
    @IsOptional()
    url: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mimetype: string;
}

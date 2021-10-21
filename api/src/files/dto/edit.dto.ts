import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUrl } from 'class-validator';

export class EditImageDTO {
    @ApiProperty()
    @IsOptional()
    type: string;
    @ApiProperty()
    @IsUrl()
    @IsOptional()
    url: string;
}

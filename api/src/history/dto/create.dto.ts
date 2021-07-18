import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class CreateHistoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    funderId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    modify: string;
    @ApiProperty()
    @IsString()
    staffId?: string
}

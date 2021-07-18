import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class HistoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    time: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    date: string;
}

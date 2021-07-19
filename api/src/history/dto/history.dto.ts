import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class HistoryDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    funderId: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    time: string;
    @ApiProperty()
    date: string;
}
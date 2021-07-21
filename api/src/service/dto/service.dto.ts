import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class ServiceDTO {
    @ApiProperty()
    @IsNotEmpty()
    id: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    displayCode: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: string;
}

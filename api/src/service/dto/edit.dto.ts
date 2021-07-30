import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { AddressDTO } from '../../address';

export class UpdateServiceDto {
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


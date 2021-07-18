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
    @IsNumber()
    rate: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    cptCode: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    size: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    min: number
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    max: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    modifier: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    displayCode: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: string;
}


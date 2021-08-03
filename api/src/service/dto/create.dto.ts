import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
// import { FundingStatus } from '../funding.constants';

export class CreateServiceDto {
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
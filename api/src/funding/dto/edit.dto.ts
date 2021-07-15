import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { AddressDTO } from '../../address';

export class UpdateFundingDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    type: string;
    @ApiProperty()
    @IsNotEmpty()
    contact: string;
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    website: string
    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;
    @ApiProperty()
    @IsNotEmpty()
    address: string;
    @IsString()
    status: string
}


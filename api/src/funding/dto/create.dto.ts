export class CreateFundingDto { }
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { AddressDTO } from '../../address';

export class CreateFundingDTO {
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
    @ApiProperty()
    @IsString()
    status: string = 'active'
}


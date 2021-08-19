import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { AddressDTO, IAddress } from '../../address';
import { FundingStatus } from '../funding.constants';

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
    @ApiProperty({ type: AddressDTO })
    address: string;
    @ApiProperty({ enum: FundingStatus })
    @IsEnum(FundingStatus)
    status: number;
}


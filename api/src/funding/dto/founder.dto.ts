import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator';
import { AddressDTO } from '../../address';

export class FundingDTO {
    @ApiProperty()
    adminId?: string;
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    type: string;
    @ApiProperty()
    contact: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    website: string
    @ApiProperty()
    phoneNumber: string;
    @ApiProperty({ type: AddressDTO })
    address: AddressDTO;
    @ApiProperty()
    status: string;
    @ApiProperty()
    comments: string;
}

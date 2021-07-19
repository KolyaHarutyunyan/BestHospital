import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator';
import { AddressDTO } from '../../address';
import { FundingStatus } from '../funding.constants';

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
    @ApiProperty({ enum: FundingStatus })
    @IsEnum(FundingStatus)
    status: number;
}

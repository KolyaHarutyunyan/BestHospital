import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ClientStatus } from '../client.constants';

export class CreateContactDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    relationship: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber('US')
    phoneNumber: string;
    // address
}


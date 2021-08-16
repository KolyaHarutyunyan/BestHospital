import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator';

export class ContactDTO {
    @ApiProperty()
    clientId?: string;
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    relationship: string;
    @ApiProperty()
    phoneNumber: string;
}

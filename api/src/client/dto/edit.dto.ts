import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ClientStatus } from '../client.constants';

export class UpdateClientDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty({ required: false })
    middleName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    code: string;
    @ApiProperty()
    ethnicity: string;
    @ApiProperty()
    language: string;
    @ApiProperty()
    familyLanguage: string;
    @ApiProperty()
    gender: string;
    @ApiProperty()
    birthday: Date;
    @ApiProperty({ enum: ClientStatus })
    status: number;
}


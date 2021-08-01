import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ClientStatus } from '../client.constants';

export class CreateClientDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;
    @ApiProperty({ required: false })
    middleName: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ethnicity: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    language: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    familyLanguage: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    gender: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    birthday: Date;
    @IsString()
    contacts: string;
    @ApiProperty({ enum: ClientStatus })
    @IsEnum(ClientStatus)
    status: number;
    // address
}

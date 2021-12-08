import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserDTO } from '../../authN';
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
    @IsDateString()
    birthday: Date;
    @ApiProperty({ enum: ClientStatus })
    @IsEnum(ClientStatus)
    status: number;
    user: UserDTO
    // address
}

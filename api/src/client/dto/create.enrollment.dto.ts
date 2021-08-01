import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ClientStatus } from '../client.constants';

export class CreateEnrollmentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    primary: boolean;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    startDate: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    terminationDate: string;
}


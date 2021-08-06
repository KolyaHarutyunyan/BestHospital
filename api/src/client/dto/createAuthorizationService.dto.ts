import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ClientStatus } from '../client.constants';

export class CreateAuthorizationServiceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    total: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    completed: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    available: string;
}

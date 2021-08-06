import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator';

export class AuthorizationServiceDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    clientId: string;
    @ApiProperty()
    service: string;
    @ApiProperty()
    modifiers: string;
    @ApiProperty()
    total: string;
    @ApiProperty()
    completed: string;
    @ApiProperty()
    available: string;
}

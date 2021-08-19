import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator';

export class AuthorizationServiceDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    authorizationId: string;
    @ApiProperty()
    serviceId: string;
    @ApiProperty()
    total: number;
    @ApiProperty()
    modifiers: Array<string>;
    // @ApiProperty()
    // completed: number;
    // @ApiProperty()
    // available: number;
}

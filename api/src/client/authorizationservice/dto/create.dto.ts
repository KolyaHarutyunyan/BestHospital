export class CreateAuthorizationserviceDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class CreateAuthorizationServiceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    total: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    completed: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    available: number;
}

export class CreateAuthorizationDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { AddressDTO } from '../../../address/dto';

export class CreateAuthorizationDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    authorizationId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    startDate: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    endDate: string;
    @ApiProperty()
    @IsNotEmpty()
    address: string;
}

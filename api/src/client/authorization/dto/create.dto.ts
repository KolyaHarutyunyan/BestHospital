export class CreateAuthorizationDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AddressDTO } from '../../../address';
import { AuthorizationStatus } from '../authorization.constants';

export class CreateAuthorizationDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    authId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startDate: Date;
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    endDate: Date;
    @ApiProperty({ type: AddressDTO })
    @IsNotEmpty()
    address: string;
    @ApiProperty({ enum: AuthorizationStatus })
    @IsEnum(AuthorizationStatus)
    status: number;
}

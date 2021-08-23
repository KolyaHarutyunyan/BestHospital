export class CreateAuthorizationDto { }
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuthorizationStatus } from '../authorization.constants';
import { AddressDTO } from '../../../address';

export class UpdateAuthorizationDTO {
    @ApiProperty()
    @IsOptional()
    @IsString()
    authId: string;
    @ApiProperty()
    @IsOptional()
    @IsDateString()
    startDate: Date;
    @ApiProperty()
    @IsOptional()
    @IsDateString()
    endDate: Date;
    @ApiProperty({ type: AddressDTO })
    @IsOptional()
    address: string;
    @ApiProperty({ enum: AuthorizationStatus })
    @IsEnum(AuthorizationStatus)
    status: number;
}
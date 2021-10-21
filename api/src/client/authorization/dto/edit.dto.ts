export class CreateAuthorizationDto { }
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { AuthorizationStatus } from '../authorization.constants';

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
    @ApiProperty()
    @IsString()
    @IsOptional()
    location: string;
    @ApiProperty({ enum: AuthorizationStatus })
    @IsEnum(AuthorizationStatus)
    @IsOptional()
    status: number;
}

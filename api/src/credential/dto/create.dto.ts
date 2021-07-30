import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CredentialsStatus } from '../../credential';

export class CreateCredentialDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: number;
    @ApiProperty({ enum: CredentialsStatus })
    @IsNotEmpty()
    @IsEnum(CredentialsStatus)
    type: number;
}

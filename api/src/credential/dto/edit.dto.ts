import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CredentialsStatus } from '../../credential';

export class UpdateCredentialDTO {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;
    @ApiProperty({ enum: CredentialsStatus })
    @IsOptional()
    @IsEnum(CredentialsStatus)
    type: number;
}

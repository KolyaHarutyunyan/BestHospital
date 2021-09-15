import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ParseObjectIdPipe } from '../../../util';
import { ModifierStatus, TypeStatus } from '../../funding.constants';

// import { FundingStatus } from '../funding.constants';

export class UpdateModifierDto {
    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    credentialId: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    chargeRate: number;
    @ApiProperty({ enum: TypeStatus })
    @IsEnum(TypeStatus)
    @IsOptional()
    type: number;
}

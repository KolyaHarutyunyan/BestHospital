import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ParseObjectIdPipe } from '../../util';
import { ModifierStatus, TypeStatus } from '../funding.constants';

// import { FundingStatus } from '../funding.constants';

export class CreateModifierDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    credentialId: string;
    @ApiProperty()
    @IsNumber()
    chargeRate: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({ enum: TypeStatus })
    @IsEnum(TypeStatus)
    type: number;
}

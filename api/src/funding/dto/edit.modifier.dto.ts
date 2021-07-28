import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ParseObjectIdPipe } from '../../util';
import { ModifierStatus, TypeStatus } from '../funding.constants';

// import { FundingStatus } from '../funding.constants';

export class UpdateModifierDto {
    @ApiProperty()
    credentialId: string;
    @ApiProperty()
    modifierName: string;
    @ApiProperty()
    chargeRate: number;
    @ApiProperty()
    credentialName: string;
    @ApiProperty()
    credentialType: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayContains, IsEmail, IsEmpty, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
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
    serviceId?: string;
}
export class CreateModifiersDTO {
    @ApiProperty({type: [CreateModifierDto]})
    @ValidateNested({ each: true })
    @Type(() => CreateModifierDto)
    modifiers: CreateModifierDto[]
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    serviceId: string;
}
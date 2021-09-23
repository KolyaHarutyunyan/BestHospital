import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEmpty, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { ParseObjectIdPipe } from '../../../util';
import { ModifierStatus, TypeStatus } from '../../funding.constants';

// import { FundingStatus } from '../funding.constants';

// export class UpdateModifierDto {
//     @ApiProperty()
//     @IsMongoId()
//     @IsOptional()
//     credentialId: string;
//     @ApiProperty()
//     @IsMongoId()
//     @IsOptional()
//     fundingServiceId: string;
//     @ApiProperty()
//     @IsOptional()
//     @IsString()
//     name: string;
//     @ApiProperty()
//     @IsNumber()
//     @IsOptional()
//     chargeRate: number;
//     @ApiProperty({ enum: TypeStatus })
//     @IsEnum(TypeStatus)
//     @IsOptional()
//     type: number;
// }


export class UpdateModifierDto {
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
export class UpdateModifiersDto {
    @ApiProperty({ type: [UpdateModifierDto] })
    @ValidateNested({ each: true })
    @Type(() => UpdateModifierDto)
    modifiers: UpdateModifierDto[]
}

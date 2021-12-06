import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { TypeStatus } from '../../funding.constants';

export class UpdateModifierDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    credentialId: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    chargeRate: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({ enum: TypeStatus })
    @IsEnum(TypeStatus)
    type: number;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    _id: string; 
}

export class UpdateModifiersDto {
    @ApiProperty({ type: [UpdateModifierDto] })
    @ValidateNested({ each: true })
    @Type(() => UpdateModifierDto)
    modifiers: UpdateModifierDto[];
}

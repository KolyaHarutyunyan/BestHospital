import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ParseObjectIdPipe } from '../../util';
import { ModifierStatus, TypeStatus } from '../funding.constants';

// import { FundingStatus } from '../funding.constants';

export class CreateServiceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    serviceId: string;
    @ApiProperty()
    credentialId: ParseObjectIdPipe;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    rate: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    cptCode: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    size: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    min: number
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    max: number;
    @ApiProperty({ enum: ModifierStatus })
    @IsEnum(ModifierStatus)
    modifier: number;
    @ApiProperty({ enum: TypeStatus })
    @IsEnum(TypeStatus)
    type: number;
}

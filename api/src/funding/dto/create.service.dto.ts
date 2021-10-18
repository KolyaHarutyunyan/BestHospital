import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ParseObjectIdPipe } from '../../util';
import { ModifierStatus, TypeStatus } from '../funding.constants';

// import { FundingStatus } from '../funding.constants';

export class CreateServiceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    serviceId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    rate: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cptCode: string;
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

    // @ApiProperty({ enum: TypeStatus })
    // @IsEnum(TypeStatus)
    // type: number;
}

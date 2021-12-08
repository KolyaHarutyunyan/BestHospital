import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString,  } from 'class-validator';
import { UserDTO } from '../../authN';

export class UpdateServiceDto {
    @ApiProperty()
    globServiceId: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
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
    user: UserDTO
}


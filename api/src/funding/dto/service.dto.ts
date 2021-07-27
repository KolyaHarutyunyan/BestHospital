import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class ServiceDTO {
    @ApiProperty()
    @IsNotEmpty()
    id: string
    @ApiProperty()
    credentials?: any
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    serviceId: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    funderId: string;
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
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    modifier: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    type: number;
}

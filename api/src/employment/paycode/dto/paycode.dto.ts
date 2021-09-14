import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class PayCodeDTO {
    @ApiProperty()
    @IsMongoId()
    id: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    employmentId: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    payCodeTypeId: string;
    @IsNumber()
    @IsNotEmpty()
    rate: number;
    @IsBoolean()
    @IsNotEmpty()
    active: boolean;
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;
    @IsDateString()
    @IsOptional()
    endDate?: Date;
}
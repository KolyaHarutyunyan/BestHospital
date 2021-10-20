import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class PayCodeDTO {
    @ApiProperty()
    name: string;
    @ApiProperty()
    id: string;
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    employmentId: string;
    @ApiProperty()
    payCodeTypeId: string;
    @IsNumber()
    rate: number;
    @IsBoolean()
    active: boolean;
    @ApiProperty()
    startDate: Date;
    @ApiProperty()
    endDate?: Date;
}
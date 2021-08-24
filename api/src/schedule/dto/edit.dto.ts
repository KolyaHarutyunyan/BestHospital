
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class UpdateScheduleDTO {
    @IsArray()
    @IsOptional()
    monday: Array<Object>
    @IsArray()
    @IsOptional()
    tuesday: Array<Object>
}


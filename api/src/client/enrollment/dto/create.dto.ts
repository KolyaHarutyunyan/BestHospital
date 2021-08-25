import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class CreateEnrollmentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    primary: boolean;
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startDate: Date;
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    terminationDate: Date;
}


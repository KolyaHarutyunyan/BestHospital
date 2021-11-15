import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

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
    @IsOptional()
    @IsDateString()
    terminationDate: Date;
}


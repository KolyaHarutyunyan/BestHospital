import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEnrollmentDTO {
    @ApiProperty()
    @IsOptional()
    @IsDateString()
    startDate: Date;
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    terminationDate: Date;
    @ApiProperty()
    @IsNotEmpty()
    primary: boolean;
}

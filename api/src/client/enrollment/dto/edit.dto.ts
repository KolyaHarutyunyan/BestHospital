import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEnrollmentDTO {
    @ApiProperty()
    @IsOptional()
    startDate: string;
    @ApiProperty()
    terminationDate: string;
    @ApiProperty()
    @IsNotEmpty()
    primary: boolean;
}

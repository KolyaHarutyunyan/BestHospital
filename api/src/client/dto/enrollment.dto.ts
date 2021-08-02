import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator';

export class EnrollmentDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    clientId: string;
    @ApiProperty()
    primary: boolean;
    @ApiProperty()
    startDate: string;
    @ApiProperty()
    terminationDate: string;
    @ApiProperty()
    fundingSource: string
}

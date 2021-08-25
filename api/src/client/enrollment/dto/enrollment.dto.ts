import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator';

export class EnrollmentDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    clientId: string;
    @ApiProperty()
    funderId: string;
    @ApiProperty()
    primary: boolean;
    @ApiProperty()
    startDate: Date;
    @ApiProperty()
    terminationDate: Date;
}

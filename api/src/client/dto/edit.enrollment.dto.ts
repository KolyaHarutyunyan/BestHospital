import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ClientStatus } from '../client.constants';

export class UpdateEnrollmentDto {
    @ApiProperty()
    startDate: Date;
    @ApiProperty()
    terminationDate: Date;
    @ApiProperty()
    fundingSource: string;
    @ApiProperty()
    primary: string;
}

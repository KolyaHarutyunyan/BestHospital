import { ApiProperty } from '@nestjs/swagger';

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

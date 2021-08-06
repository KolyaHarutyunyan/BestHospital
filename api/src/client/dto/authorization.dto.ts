import { ApiProperty } from '@nestjs/swagger';
export class AuthorizationDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    clientId: string;
    @ApiProperty()
    authorizationId: string;
    @ApiProperty()
    fundingSource: string;
    @ApiProperty()
    startDate: string;
    @ApiProperty()
    endDate: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { AddressDTO } from '../../../address/dto';
import { AuthorizationStatus } from '../authorization.constants';

export class AuthorizationDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    clientId: string;
    @ApiProperty()
    authId: string;
    @ApiProperty()
    funderId: string;
    @ApiProperty()
    startDate: Date;
    @ApiProperty()
    endDate: Date;
    @ApiProperty({ type: AddressDTO })
    address: AddressDTO;
    @ApiProperty({ enum: AuthorizationStatus })
    status: number
}
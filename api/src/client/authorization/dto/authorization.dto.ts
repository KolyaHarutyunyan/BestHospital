import { ApiProperty } from '@nestjs/swagger';
import { AddressDTO } from '../../../address/dto';

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
    startDate: string;
    @ApiProperty()
    endDate: string;
    @ApiProperty({ type: AddressDTO })
    address: AddressDTO;
}
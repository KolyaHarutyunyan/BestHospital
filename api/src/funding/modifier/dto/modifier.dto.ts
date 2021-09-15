import { ApiProperty } from '@nestjs/swagger';
import { TypeStatus } from '../../funding.constants';

export class ModifyDTO {
    @ApiProperty()
    id: string
    @ApiProperty()
    serviceId: string
    @ApiProperty()
    name: string
    @ApiProperty({ enum: TypeStatus })
    type: number;
    @ApiProperty()
    chargeRate: number
    @ApiProperty()
    credentialId: string
}

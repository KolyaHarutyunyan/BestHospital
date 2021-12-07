import { ApiProperty } from '@nestjs/swagger';
import { TypeStatus } from '../../funding.constants';

export class ModifyDTO {
    @ApiProperty()
    _id: string
    @ApiProperty()
    name: string
    @ApiProperty({ enum: TypeStatus })
    type: number;
    @ApiProperty()
    chargeRate: number
    @ApiProperty()
    credentialId: string;
    @ApiProperty()
    status: boolean
}

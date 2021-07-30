import { ApiProperty } from '@nestjs/swagger';

export class StaffCredentialDTO {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    credentialId: string;
    @ApiProperty({ required: false })
    expirationDate?: String;
}

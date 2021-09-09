import { ApiProperty } from '@nestjs/swagger';

export class SCredentialDTO {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    staffId: string;
    @ApiProperty()
    credentialId: string;
    @ApiProperty({ required: false })
    expirationDate: Date;
    @ApiProperty()
    receiveData: string
}

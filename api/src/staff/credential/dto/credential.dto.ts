import { ApiProperty } from '@nestjs/swagger';

export class CredentialDTO {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    staffId: string;
    @ApiProperty()
    credentialId: string;
    @ApiProperty({ required: false })
    expirationDate: Date;
}

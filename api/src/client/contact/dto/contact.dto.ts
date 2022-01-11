import { ApiProperty } from '@nestjs/swagger';
import { AddressDTO } from '../../../address/dto';

export class ContactDTO {
  @ApiProperty()
  clientId?: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  relationship: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty({ type: AddressDTO })
  address: AddressDTO;
}

import { ApiProperty } from '@nestjs/swagger';

export class AddressDTO {
  @ApiProperty()
  lat: number;
  @ApiProperty()
  lng: number;
  @ApiProperty()
  street: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  zip: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  formattedAddress: string;
}

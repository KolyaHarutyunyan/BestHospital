import { ApiProperty } from '@nestjs/swagger';

export class ConvertAddressDTO {
  @ApiProperty()
  address: string;
}

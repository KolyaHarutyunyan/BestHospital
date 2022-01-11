import { ApiProperty } from '@nestjs/swagger';

export class PlaceDTO {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  code: string;
}

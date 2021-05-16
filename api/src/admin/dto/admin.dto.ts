import { ApiProperty } from '@nestjs/swagger';

export class AdminDTO {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
}

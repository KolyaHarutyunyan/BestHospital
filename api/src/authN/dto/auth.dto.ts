import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty()
  token: string;
  @ApiProperty({ type: [Number] })
  permissions?: number[];
}

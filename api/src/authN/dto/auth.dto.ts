import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../authN.constants';

export class AuthDTO {
  @ApiProperty()
  token: string;
  @ApiProperty({ type: [Number] })
  permissions?: number[];
  @ApiProperty({ enum: UserType })
  userType: UserType;
}

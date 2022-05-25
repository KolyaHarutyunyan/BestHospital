import { ApiProperty } from '@nestjs/swagger';
import { AuthorizationStatus } from '../auth.constants';

export class AuthDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  clientId: string;
  @ApiProperty()
  authId: string;
  @ApiProperty()
  funderId: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  location: string;
  @ApiProperty({ enum: AuthorizationStatus })
  status: string;
}

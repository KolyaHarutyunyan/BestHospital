import { ApiProperty } from '@nestjs/swagger';

/** DTO that is sent to the user for changing the password */
export class PassChangedDTO {
  constructor(token: string) {
    this.accessToken = token;
  }
  @ApiProperty({ description: 'Updated access token' })
  accessToken: string;
}

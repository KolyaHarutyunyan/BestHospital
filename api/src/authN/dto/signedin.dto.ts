import { ApiProperty } from '@nestjs/swagger';
// import { UserDTO } from '../../admin';
import { AuthDTO } from './auth.dto';

/** DTO that is sent to the user for most authentication requests */
export class SignedInDTO {
  constructor(auth: AuthDTO) {
    this.auth = auth;
  }
  @ApiProperty({ type: AuthDTO })
  auth: AuthDTO;
  //   @ApiProperty({ type: UserDTO })
  //   user: UserDTO;
}

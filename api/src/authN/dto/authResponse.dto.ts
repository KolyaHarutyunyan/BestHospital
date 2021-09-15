import { ApiProperty } from '@nestjs/swagger';
import { RoleDTO } from '../../authZ';
export class AuthResponseDTO {
  @ApiProperty()
  email: string;
  @ApiProperty({ type: [RoleDTO] })
  roles: string[] | RoleDTO[];
}

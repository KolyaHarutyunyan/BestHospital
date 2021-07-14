import { ApiProperty } from '@nestjs/swagger';
import { PermissionDTO } from '../../permission';

export class RoleDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  permissions?: string[] | PermissionDTO[];
  @ApiProperty()
  isDefault: boolean;
}

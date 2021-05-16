import { ApiProperty } from '@nestjs/swagger';

export class RolePermissionDTO {
  @ApiProperty()
  permissionId: string;
}

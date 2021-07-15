import { ApiProperty } from '@nestjs/swagger';

export class RolePermissionsDTO {
  @ApiProperty()
  permissions: string[];
}

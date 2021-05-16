import { ApiProperty } from '@nestjs/swagger';

export class PermissionDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}

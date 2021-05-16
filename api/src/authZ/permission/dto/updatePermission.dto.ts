import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDTO {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}

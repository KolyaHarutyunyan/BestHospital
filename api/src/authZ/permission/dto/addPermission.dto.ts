import { ApiProperty } from '@nestjs/swagger';

export class AddPermissionDTO {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  code: number;
}

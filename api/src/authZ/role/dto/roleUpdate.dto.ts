import { ApiProperty } from '@nestjs/swagger';

export class RoleUpdateDTO {
  @ApiProperty({ required: false })
  title?: string;
  @ApiProperty({ required: false })
  description?: string;
}

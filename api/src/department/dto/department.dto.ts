import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class JobDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

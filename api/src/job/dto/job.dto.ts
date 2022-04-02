import { ApiProperty } from '@nestjs/swagger';

export class JobDTO {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string;
}

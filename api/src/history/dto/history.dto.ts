import { ApiProperty } from '@nestjs/swagger';

export class HistoryDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  user: string;
  @ApiProperty()
  resource: string;
  @ApiProperty()
  onModel: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  time: string;
  @ApiProperty()
  createdDate: string;
}

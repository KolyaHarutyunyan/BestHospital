import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CommentDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  text: string;
  @ApiProperty()
  resource: string;
  @ApiProperty()
  onModel: string;
  @ApiProperty()
  user: string;
  @ApiProperty()
  created: Date;
}

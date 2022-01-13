import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserDTO } from '../../authN';

export class UpdateCommentDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  subject: string;
  user: UserDTO;
}

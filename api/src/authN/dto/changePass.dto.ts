import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePassDTO {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
  @ApiProperty()
  @IsNotEmpty()
  confirmation: string;

  //Set by the system
  userId: string;
}

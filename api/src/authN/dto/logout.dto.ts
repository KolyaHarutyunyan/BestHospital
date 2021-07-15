import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/** send to the user for logging out */
export class LogoutDTO {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}

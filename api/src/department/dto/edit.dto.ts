import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDepartmentDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

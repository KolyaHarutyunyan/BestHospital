import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { FileType } from '../constants';

export class CreateImageDTO {
  @ApiProperty({ enum: FileType })
  @IsEnum(FileType)
  @IsNotEmpty()
  type: string;
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}

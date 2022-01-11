import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { HistoryStatus } from '../history.constants';

export class CreateHistoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsMongoId()
  @ApiProperty()
  resource: string;
  @ApiProperty({ enum: HistoryStatus })
  @IsEnum(HistoryStatus)
  onModel: string;
  user: string;
}

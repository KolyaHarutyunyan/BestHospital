import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DTO } from '../../util';
import { TxnType } from '../txn.constants';

export class TxnDto extends DTO {
  @ApiProperty()
  _id?: string;
  @ApiProperty({ enum: TxnType })
  @IsEnum(TxnType)
  type: string;
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: Date;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rate: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  paymentRef: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  note?: string;
  status?: string;
  billing: string;
  creator: string;
}

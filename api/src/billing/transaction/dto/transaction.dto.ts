import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DTO } from '../../../util';
import { TransactionType } from '../transaction.constants';

export class TransactionDto extends DTO {
  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
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
  note: string;
  status?: string;
  billing: string;
  creator: string;
}

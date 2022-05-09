import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentType } from '../invoice-pmt.constants';

export class UpdateInvPmtDto {
  @ApiProperty({ enum: PaymentType })
  @IsEnum(PaymentType)
  paymentType: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  paymentReference: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  paymentDate: Date;
}

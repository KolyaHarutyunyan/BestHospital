import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentType } from '../claim-pmt.contants';

export class UpdateClaimPmtDto {
  @ApiProperty({ enum: PaymentType })
  @IsEnum(PaymentType)
  @IsOptional()
  paymentType: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  checkNumber: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  paymentDate: Date;
}

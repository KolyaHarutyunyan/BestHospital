import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { UserDTO } from '../../authN';
import { PaymentType } from '../claim-pmt.contants';

export class CreateClaimPmtDto {
  @ApiProperty({ enum: PaymentType })
  @IsEnum(PaymentType)
  paymentType: string;
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  fundingSource: string;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  paymentAmount: number;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  paymentDate: Date;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  checkNumber: string;
  user?: UserDTO;
}
export class CreateReceivableDTO {
  @ApiProperty()
  receivableIds: string[];
  @ApiProperty()
  allowedAMT: number;
  @ApiProperty()
  deductible: number;
  @ApiProperty()
  compay: number;
  @ApiProperty()
  coINS: number;
  @ApiProperty()
  paidAMT: number;
}

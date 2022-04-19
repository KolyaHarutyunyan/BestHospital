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
  @IsNotEmpty()
  @IsMongoId()
  claimId: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  paymentDate: Date;
  @ApiProperty()
  @IsString()
  @IsOptional()
  checkNumber: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  achNumber: string;
  user?: UserDTO;
}

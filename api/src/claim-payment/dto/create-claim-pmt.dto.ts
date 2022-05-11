import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DTO } from '../../util';
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
}
class ReceivableDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  receivableId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  allowedAMT: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  deductible: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  copay: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  coINS: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  paidAMT: number;
}
export class CreateReceivableDTO extends DTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  claimId: string;
  @ApiProperty({ type: [ReceivableDTO] })
  @ValidateNested({ each: true })
  @Type(() => ReceivableDTO)
  receivables: ReceivableDTO[];
}

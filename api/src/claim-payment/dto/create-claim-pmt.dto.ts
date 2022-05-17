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
import { PaymentType } from '../claim-pmt.contants';
import { FileDTO } from '../../files/dto/file.dto';

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
class ClaimReceivableDTO {
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
export class CreateClaimReceivableDTO extends DTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  claimId: string;
  @ApiProperty({ type: [ClaimReceivableDTO] })
  @ValidateNested({ each: true })
  @Type(() => ClaimReceivableDTO)
  receivables: ClaimReceivableDTO[];
}
export class CreateDocDTO extends DTO {
  @ApiProperty({ type: FileDTO })
  file: FileDTO;
}

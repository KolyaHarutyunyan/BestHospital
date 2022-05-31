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
import { PaymentType } from '../invoice-pmt.constants';
import { FileDTO } from '../../files/dto';

export class CreateInvPmtDto {
  @ApiProperty({ enum: PaymentType })
  @IsEnum(PaymentType)
  paymentType: string;
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  client: string;
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
class ReceivableDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  receivableId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  paidAMT: number;
}
export class CreateReceivableDTO extends DTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  invoiceId: string;
  @ApiProperty({ type: [ReceivableDTO] })
  @ValidateNested({ each: true })
  @Type(() => ReceivableDTO)
  receivables: ReceivableDTO[];
}
export class CreateDocDTO extends DTO {
  @ApiProperty({ type: FileDTO })
  file: FileDTO;
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}

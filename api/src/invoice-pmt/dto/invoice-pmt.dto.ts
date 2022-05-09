import { ApiProperty } from '@nestjs/swagger';
import { ITransaction } from '../interface/invoice-pmt.interface';
import { PaymentType } from '../invoice-pmt.constants';

export class InvPmtDto {
  @ApiProperty()
  _id: string;
  @ApiProperty({ enum: PaymentType })
  paymentType: string;
  @ApiProperty()
  paymentReference: string;
  @ApiProperty()
  paymentAmount: number;
  @ApiProperty()
  payer: string;
  @ApiProperty()
  invoice: string;
  @ApiProperty()
  paymentDate: Date;
  transaction: ITransaction[];
  documents: string[];
}

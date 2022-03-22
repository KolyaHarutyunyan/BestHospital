import { ApiProperty } from '@nestjs/swagger';
import { ITransaction } from '../interface/posting.interface';
import { PaymentType } from '../posting.constants';

export class PostingDto {
  @ApiProperty()
  _id: string;
  @ApiProperty({ enum: PaymentType })
  paymentType: string;
  @ApiProperty()
  paymentReference: string;
  @ApiProperty()
  paymentDocument: string;
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

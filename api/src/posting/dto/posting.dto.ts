import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '../posting.constants';

export class PostingDto {
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
  invoices: Array<string>;
}

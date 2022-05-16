import { ApiProperty } from '@nestjs/swagger';
import { IReceivable } from '../interface';

export class ClaimDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  client: string;
  @ApiProperty()
  staff: string;
  @ApiProperty()
  funder: string;
  @ApiProperty()
  totalCharge: number;
  @ApiProperty()
  totalBilled: number;
  @ApiProperty()
  ammountPaid: number;
  @ApiProperty()
  submittedDate: Date;
  @ApiProperty()
  paymentRef: string;
  @ApiProperty()
  link: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  details: string;
  @ApiProperty()
  dateRange: Date;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  receivable: IReceivable[];
}

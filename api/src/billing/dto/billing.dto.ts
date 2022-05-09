import { ApiProperty } from '@nestjs/swagger';
import { ITxn } from '../txn/interface';

export class BillingDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  appointment: string;
  @ApiProperty()
  payer: string;
  @ApiProperty()
  client: string;
  @ApiProperty()
  staff: string;
  @ApiProperty()
  authorization: string;
  @ApiProperty()
  authService: string;
  @ApiProperty()
  placeService: string;
  @ApiProperty()
  totalHours: number;
  @ApiProperty()
  totalUnits: number;
  @ApiProperty()
  dateOfService: Date;
  @ApiProperty()
  billedAmount: number;
  @ApiProperty()
  payerTotal: number;
  @ApiProperty()
  payerPaid: number;
  @ApiProperty()
  clientResp: number;
  @ApiProperty()
  clientPaid: number;
  @ApiProperty()
  balance: number;
  @ApiProperty()
  location: string;
  @ApiProperty()
  claimStatus: string;
  @ApiProperty()
  invoiceStatus: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  transaction?: ITxn[];
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;
  billing?: string;
}

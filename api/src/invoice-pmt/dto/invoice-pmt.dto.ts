import { ApiProperty } from '@nestjs/swagger';

export class InvPmtDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  paymentAmount: number;
  @ApiProperty()
  paymentType: string;
  @ApiProperty()
  paymentRef: string;
  @ApiProperty()
  paymentDate: Date;
  @ApiProperty()
  checkNumber: string;
  @ApiProperty()
  client: string;
  @ApiProperty()
  invoices: string[];
  @ApiProperty()
  eob: string;
}

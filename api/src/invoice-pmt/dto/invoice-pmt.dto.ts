import { ApiProperty } from '@nestjs/swagger';
import { FileDTO } from '../../files/dto';
import { InvPmtStatus } from '../invoice-pmt.constants';

export class InvPmtDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  paymentAmount: number;
  @ApiProperty()
  paymentType: string;
  @ApiProperty()
  paymentDate: Date;
  @ApiProperty()
  checkNumber: string;
  @ApiProperty()
  totalBilled: number;
  @ApiProperty()
  totalUsed: number;
  @ApiProperty()
  status: InvPmtStatus;
  @ApiProperty()
  client: string;
  @ApiProperty()
  invoices: string[];
  @ApiProperty()
  documents: FileDTO[];
  @ApiProperty()
  createdAt: Date;
}

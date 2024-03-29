import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatus } from '../invoice.constants';

interface IDateRange {
  early: Date;
  latest: Date;
}
interface IDateOfService {
  start: Date;
  end: Date;
}
export class IReceivable {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  dateOfService: IDateOfService;
  @ApiProperty()
  serviceDate: Date;
  @ApiProperty()
  hours: number;
  @ApiProperty()
  amountTotal: number;
  @ApiProperty()
  clientResp: number;
  @ApiProperty()
  clientPaid: number;
  @ApiProperty()
  balance: number;
  @ApiProperty()
  cptCode: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  bills: Array<string>;
}
export class InvoiceDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  client: string;
  @ApiProperty()
  dateRange: IDateRange;
  @ApiProperty()
  invoiceTotal: number;
  @ApiProperty()
  totalHours: number;
  @ApiProperty()
  ammountPaid: number;
  @ApiProperty()
  totalBilled: number;
  @ApiProperty()
  dueDate: Date;
  @ApiProperty()
  downloadLink: string;
  @ApiProperty()
  status: InvoiceStatus;
  @ApiProperty()
  receivable: IReceivable[];
}

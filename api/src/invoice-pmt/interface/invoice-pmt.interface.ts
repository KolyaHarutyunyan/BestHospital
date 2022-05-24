import { Document } from 'mongoose';
import { FileDTO } from '../../files/dto';
import { InvPmtDto } from '../dto';
import { InvPmtStatus } from '../invoice-pmt.constants';

export interface IInvPmt extends Document {
  paymentType: string;
  paymentAmount: number;
  paymnetDate: Date;
  invoices: string[];
  paymentDate: Date;
  checkNumber: string;
  totalBilled: number;
  totalUsed: number;
  status: InvPmtStatus;
  client: string;
  documents: FileDTO[];
  createdAt: Date;
}

export interface IInvPmtCount {
  invPmt: InvPmtDto[];
  count: number;
}

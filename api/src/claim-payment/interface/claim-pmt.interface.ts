import { FileDTO } from '../../files/dto';
import { ClaimPmtStatus, DocumentStatus, PaymentType } from '../claim-pmt.contants';
import { ClaimPmtDto } from '../dto';

export interface IClaimPmt extends Document {
  _id: string;
  paymentAmount: number;
  paymentType: PaymentType | string;
  paymentDate: Date;
  checkNumber: string;
  fundingSource: string;
  totalBilled: number;
  totalUsed: number;
  claimIds: string[];
  status: ClaimPmtStatus;
  documents: FileDTO[];
}
export interface IClaimPmtCount {
  claimPmt: ClaimPmtDto[];
  count: number;
}
export interface IClaimPmtDoc extends Document {
  file: FileDTO;
}
export interface IClaimPmtDoc extends Document {
  name: string;
  status: DocumentStatus;
  file: FileDTO;
}

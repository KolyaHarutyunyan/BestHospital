import { TransactionStatus, TransactionType } from '../transaction.constants';

export interface ITransaction {
  _id: string;
  billing: string;
  type: TransactionType;
  rate: number;
  date: Date;
  status: TransactionStatus;
  paymentRef: string;
  note: string;
  creator: string;
}

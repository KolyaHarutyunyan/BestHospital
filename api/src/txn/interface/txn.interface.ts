import { TxnStatus, TxnType } from '../txn.constants';

export interface ITxn {
  _id?: string;
  billing: string;
  type: TxnType;
  rate: number;
  date: Date;
  status?: TxnStatus;
  paymentRef: string;
  note?: string;
  creator: string;
}

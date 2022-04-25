import { IReceivable } from '.';

export interface IClaim extends Document {
  _id: string;
  status: string;
  client: string;
  staff: string;
  funder: string;
  totalCharge: number;
  ammountPaid: number;
  submittedDate: Date;
  paymentRef: string;
  link: string;
  dateRange: Date;
  createdDate: Date;
  details: string;
  receivable: IReceivable[];
}

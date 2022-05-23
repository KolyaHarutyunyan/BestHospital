import { IReceivable } from '.';

export interface IClaim extends Document {
  _id: string;
  status: string;
  client: string;
  staff: string;
  funder: string;
  totalCharge: number;
  totalBilled: number;
  ammountPaid: number;
  // clientResp: number;
  // submittedDate: Date;
  paymentRef: string;
  // link: string;
  dateRange: { early: Date; latest: Date };
  // createdDate: Date;
  // details: string;
  receivable: IReceivable[];
}

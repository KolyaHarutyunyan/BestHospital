import { InvoiceStatus } from "../invoice.constants";

interface IDateRange extends Document {
  early: Date;
  latest: Date;
}
interface IDateOfService extends Document {
  start: Date;
  end: Date;
}
export interface IReceivable extends Document {
  reduce(arg0: (prev: any, curr: any) => any);
  _id: string;
  dateOfService: IDateOfService;
  serviceDate: Date;
  hours: number;
  amountTotal: number;
  clientResp: number;
  clientPaid: number;
  balance: number;
  cptCode: number;
  status: string;
  bills: Array<string>;
}
export interface IInvoice extends Document {
  _id: string;
  client: string;
  dateRange: IDateRange;
  invoiceTotal: number;
  totalTime: number;
  dueDate: Date;
  downloadLink: string;
  status: InvoiceStatus;
  receivable: IReceivable[];
}

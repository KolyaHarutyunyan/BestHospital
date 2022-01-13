import { Document } from 'mongoose';
export interface ITransaction {
  type: string;
  date: Date;
  amount: number;
  paymentRef: string;
  creator: string;
  note: string;
}

export interface IBilling extends Document {
  id: string;
  appointment: string;
  payer: string;
  client: string;
  staff: string;
  authorization: string;
  authService: string;
  placeService: string;
  totalHours: number;
  totalUnits: number;
  billedRate: number;
  billedAmount: number;
  payerTotal: number;
  payerPaid: number;
  clientResp: number;
  clientPaid: number;
  balance: number;
  location: string;
  claimStatus: string;
  invoiceStatus: string;
  status: string;
  dateOfService: Date;
  createdDate: Date;
  updatedDate: Date;
  transaction: ITransaction[];
}

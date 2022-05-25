import { Document } from 'mongoose';
import { IAuthService } from '../../client/auth-service/interface/auth-service.interface';
import { IAuth } from '../../client/auth/interface/auth.interface';

export interface IBilling extends Document {
  _id: string;
  appointment: string;
  payer: string;
  client: string;
  staff: string;
  authorization: IAuth | string;
  authService: IAuthService | string;
  placeService: string;
  totalHours: number;
  totalUnits: number;
  billedRate: number;
  billedAmount: number;
  payerTotal: number;
  payerPaid: number;
  payerBalance: number;
  clientResp: number;
  clientPaid: number;
  clientBalance: number;
  balance: number;
  location: string;
  claimStatus: string;
  invoiceStatus: string;
  status: string;
  dateOfService: Date;
  createdDate: Date;
  updatedDate: Date;
}

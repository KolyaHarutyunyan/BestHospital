import { Document } from 'mongoose';
import { IAuthorizationService } from '../../client/authorizationservice/interface/authorizationService.interface';
import { IAuthorization } from '../../client/authorization/interface/authorization.interface';
import { ITxn } from '../txn/interface';

export interface IBilling extends Document {
  _id: string;
  appointment: string;
  payer: string;
  client: string;
  staff: string;
  authorization: IAuthorization | string;
  authService: IAuthorizationService | string;
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
  transaction: ITxn[];
}

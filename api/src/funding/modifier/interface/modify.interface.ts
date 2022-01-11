import { Document } from 'mongoose';

export interface IModify extends Document {
  _id: string;
  serviceId: string;
  chargeRate: number;
  credentialId: string;
  name: string;
  type: number;
  status: boolean;
}

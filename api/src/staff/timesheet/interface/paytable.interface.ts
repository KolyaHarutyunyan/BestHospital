import { Types } from 'mongoose';

export interface IPaytableItem {
  id: string;
  hours: number;
  amount: number;
  rateType: string;
  name: string;
}

export interface IPayTable {
  totalHours: number;
  totalAmount: number;
  overtimes: IPaytableItem[];
}

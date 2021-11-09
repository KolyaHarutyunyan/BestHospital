import { Types } from 'mongoose';

export interface IPaytableItem {
  id: string;
  hours: number;
  amount: number;
}

export interface IPayTable {
  totalHours: number;
  totalAmount: number;
  overtimes: IPaytableItem[];
}

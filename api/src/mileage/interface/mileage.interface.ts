import { Document } from 'mongoose';

export interface IMileage extends Document {
  id: string;
  compensation: number;
  startDate: Date;
  endDate: Date;
}

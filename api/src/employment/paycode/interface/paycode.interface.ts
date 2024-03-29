import { Document } from 'mongoose';

export interface IPayCode extends Document {
  id: string;
  payCodeTypeId: string;
  rate: number;
  startDate: Date;
  employmentId: any;
  terminationDate: Date;
}

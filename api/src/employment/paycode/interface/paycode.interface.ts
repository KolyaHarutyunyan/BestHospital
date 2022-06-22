import { Document } from 'mongoose';

export interface IPayCode extends Document {
  id: string;
  payCodeTypeId: string;
  rate: number;
  active: boolean;
  startDate: Date;
  employmentId: any;
}

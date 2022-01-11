import { Document } from 'mongoose';

export interface ITermination extends Document {
  reason: string;
  date: Date;
}

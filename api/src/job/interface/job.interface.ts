import { Document } from 'mongoose';

export interface IJob extends Document {
  id: string;
  name: string;
}

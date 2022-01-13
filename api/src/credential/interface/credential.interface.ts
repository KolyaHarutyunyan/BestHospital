import { Document } from 'mongoose';

export interface ICredential extends Document {
  _id: string;
  name: string;
  type: number;
}

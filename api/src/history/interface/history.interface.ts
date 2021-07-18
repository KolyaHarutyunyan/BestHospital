import { Document } from 'mongoose';

export interface IHistory extends Document {
  title: string;
  time: string;
  date: string;
}

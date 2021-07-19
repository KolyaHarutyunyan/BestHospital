import { Document } from 'mongoose';

export interface IHistory extends Document {
  id: string;
  funderId: string;
  title: string;
  time: string;
  date: string;
}
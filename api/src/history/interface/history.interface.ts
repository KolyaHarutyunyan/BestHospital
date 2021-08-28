import { Document } from 'mongoose';

export interface IHistory extends Document {
  id: string;
  user: string;
  resource: string;
  onModel: string;
  title: string;
  time: string;
  date: string;
}
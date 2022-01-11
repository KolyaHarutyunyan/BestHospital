import { Document } from 'mongoose';

export interface IHistory extends Document {
  id: string;
  user: string;
  resource: string;
  onModel: any;
  title: string;
  time: string;
  createdDate: any;
}

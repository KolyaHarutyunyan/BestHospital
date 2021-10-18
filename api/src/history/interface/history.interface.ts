import { Document } from 'mongoose';
import { HistoryStatus } from '../history.constants';
export interface IHistory extends Document {
  id: string;
  user: string;
  resource: string;
  onModel: any;
  title: string;
  time: string;
  createdDate: any;
}
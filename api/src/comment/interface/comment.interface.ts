import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IComment extends Document {
  text: string;
  created: Date;
  user: string;
  funder: any;
}

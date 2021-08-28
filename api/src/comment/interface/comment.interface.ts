import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IComment extends Document {
  id: string;
  subject: string;
  text: string;
  resource: string;
  onModel: string;
  user: string;
  created: Date;
}

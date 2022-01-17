import { Document } from 'mongoose';

export interface IPosting extends Document {
  id: string;
  subject: string;
  text: string;
  resource: string;
  onModel: string;
  user: string;
  created: Date;
}

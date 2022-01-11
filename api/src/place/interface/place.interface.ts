import { Document } from 'mongoose';

export interface IPlace extends Document {
  id: string;
  name: string;
  code: string;
}

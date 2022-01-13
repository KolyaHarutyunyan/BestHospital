import { Document } from 'mongoose';

export interface IDepartment extends Document {
  id: string;
  name: string;
}

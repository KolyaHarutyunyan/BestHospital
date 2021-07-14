import { Document } from 'mongoose';
/** The interface type */
export interface IRole extends Document {
  title: string;
  description: string;
  permissions: string[];
  isDefault?: boolean;
}

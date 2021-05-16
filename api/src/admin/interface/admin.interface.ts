import { Document } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  firstName: string;
  lastName: string;
}

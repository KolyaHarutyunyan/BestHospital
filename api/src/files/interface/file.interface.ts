import { Document } from 'mongoose';

export interface IFile extends Document {
  id: string;
  resource: string;
  type: string;
  mimetype: string;
  size: number;
  url: string;
  name: string;
}

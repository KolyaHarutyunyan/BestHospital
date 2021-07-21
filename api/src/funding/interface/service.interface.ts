import { Document } from 'mongoose';

export interface IService extends Document {
  id: string;
  funderId: string;
  serviceId: string, 
  credentials?: any
  name: string;
  rate: number;
  cptCode: number;
  size: number;
  min: number;
  max: number;
  modifier: string;
  displayCode: string;
  category: string;
  text: string;
  created: Date;
  user: string;
}

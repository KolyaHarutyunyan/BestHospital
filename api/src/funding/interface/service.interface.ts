import { Document } from 'mongoose';

export interface IService extends Document {
  id: string;
  funderId: string;
  serviceId: string,
  modifiers: Array<Object>; 
  name: string;
  rate: number;
  cptCode: string;
  size: number;
  min: number;
  max: number;
}

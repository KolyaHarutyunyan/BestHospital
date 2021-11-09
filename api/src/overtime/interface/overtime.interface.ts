import { Document } from 'mongoose';
import { IPayCodeType } from '../../paycodetype/interface';

export interface IOverTime extends Document {
  id: string;
  name: string;
  type: string;
  multiplier: number;
  threshold: number;
}

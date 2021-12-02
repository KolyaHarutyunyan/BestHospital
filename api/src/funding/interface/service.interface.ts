import { Document } from 'mongoose';
import { CreateModifierDto } from '../modifier/dto';

export interface IService extends Document {
  id: string;
  funderId: string;
  serviceId: string,
  modifiers?: Array<CreateModifierDto>; 
  name: string;
  rate: number;
  cptCode: string;
  size: number;
  min: number;
  max: number;
}

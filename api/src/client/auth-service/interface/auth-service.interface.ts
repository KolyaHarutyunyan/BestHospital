import { Document } from 'mongoose';
import { IService } from '../../../funding/interface';

export interface IAuthService extends Document {
  id: string;
  authorizationId: string;
  serviceId: IService | string;
  modifiers: any;
  total: number;
  completed: number;
  default: boolean;
}

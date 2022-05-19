import { Document } from 'mongoose';
import { IService } from '../../../funding/interface/service.interface';

export interface IAuthorizationService extends Document {
  id: string;
  authorizationId: string;
  serviceId: IService | string;
  modifiers: any;
  total: number;
  completed: number;
}

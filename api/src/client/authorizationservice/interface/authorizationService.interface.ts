import { Document } from 'mongoose';

export interface IAuthorizationService extends Document {
  id: string;
  authorizationId: string;
  serviceId: string;
  modifiers: Array<string>;
  total: number;
  completed: number;
}

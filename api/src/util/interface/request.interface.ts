import { Request } from 'express';
import { IAuth } from '../../authN';

export interface IRequest extends Request {
  auth?: IAuth;
  permissionCodes?: Set<number>;
  userId?: any;
  token?: string;
}

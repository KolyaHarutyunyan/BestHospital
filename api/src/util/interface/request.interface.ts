import { Request } from 'express';
import { IAuth, UserDTO } from '../../authN';

export interface IRequest extends Request {
  auth?: IAuth;
  permissionCodes?: Set<number>;
  userId?: any;
  token?: string;
  user?: UserDTO;
}

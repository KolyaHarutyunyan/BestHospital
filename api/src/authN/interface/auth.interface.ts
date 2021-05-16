import { Document } from 'mongoose';
import { RegistrationStatus } from '../authN.constants';
/** Data type is used to descibe the data model of the Auth collection */
export interface IAuth extends Document {
  email: string;
  password?: string;
  status: RegistrationStatus;
  roles: string[];
  session: string;
  /**Mathods */
  comparePassword?: any;
}

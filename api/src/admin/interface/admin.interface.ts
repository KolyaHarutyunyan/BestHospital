import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IAdmin extends Document {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  ssn: number;
  dl: string;
  address: IAddress;
}

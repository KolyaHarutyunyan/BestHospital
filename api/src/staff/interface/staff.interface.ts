import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IStaff extends Document {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  secondaryEmail: string;
  phone: string;
  secondaryPhone: string;
  state: string;
  gender: string;
  birthday: string;
  residency: string;
  ssn: number;
  status: number;
  address: IAddress;
}
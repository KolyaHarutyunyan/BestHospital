import { Document } from 'mongoose';
import { IAddress } from '../../address';
import { ITermination } from '../../termination/interface';
import { ILicense } from '../interface';

export interface IStaff extends Document {
  id: string;
  firstName: string;
  middleName: string;
  service: Array<string>;
  lastName: string;
  email: string;
  secondaryEmail: string;
  phone: string;
  secondaryPhone: string;
  state: string;
  gender: string;
  birthday: Date;
  residency: string;
  ssn: number;
  status: string;
  termination: ITermination;
  address: IAddress;
  license: ILicense;
  clinical: boolean;
}

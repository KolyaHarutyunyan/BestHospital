import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IStaff extends Document {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  firstEmail: string;
  secondEmail: string;
  firstNumber: string;
  secondNumber: string;
  driveLicenze: string;
  state: string;
  gender: string;
  birthday: string;
  residency: string;
  ssn: string;
  address: IAddress;
}
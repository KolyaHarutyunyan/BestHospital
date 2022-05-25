import { Document } from 'mongoose';
import { ITermination } from '../../termination/interface';
import { IAddress } from '../../address';
import { CreateModifierDto } from '../dto';

export interface IFunder extends Document {
  adminId?: string;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  type: string;
  contact: string;
  website: string;
  address: IAddress;
  status: string;
  termination: ITermination;
}

export interface IService extends Document {
  id: string;
  funderId: string;
  serviceId: string;
  modifiers?: Array<CreateModifierDto> | any;
  name: string;
  rate: number;
  cptCode: string;
  size: number;
  min: number;
  max: number;
}

export interface IModifier extends Document {
  _id: string;
  serviceId: string;
  chargeRate: number;
  credentialId: string;
  name: string;
  type: number;
  status: boolean;
}

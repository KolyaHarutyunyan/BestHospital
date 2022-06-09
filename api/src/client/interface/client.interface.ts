import { Document } from 'mongoose';
import { ITermination } from '../../termination/interface';
import { ClientDTO } from '../dto';

export interface IClient extends Document {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  ethnicity: string;
  language: string;
  familyLanguage: string;
  gender: string;
  status: string;
  birthday: Date;
  termination: ITermination;
  enrollment: string;
}
export interface IClientCount {
  clients: ClientDTO[];
  count: number;
}

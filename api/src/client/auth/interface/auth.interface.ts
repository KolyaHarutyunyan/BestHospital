import { Document } from 'mongoose';
import { FileDTO } from '../../../files/dto';
import { DocumentStatus } from '../auth.constants';

export interface IAuth extends Document {
  id: string;
  clientId: string;
  authId: string;
  funderId: string;
  startDate: Date;
  endDate: Date;
  location: string;
  documents: FileDTO[];
}
export interface IAuthDoc extends Document {
  name: string;
  status: DocumentStatus;
  file: FileDTO;
}

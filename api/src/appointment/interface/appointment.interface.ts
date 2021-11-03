import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IAppointment extends Document {
  id: string,
  type: string,
  client: string,
  authorizedService: string,
  staff: string,
  staffPayCode: string,
  startDate: Date,
  startTime: Date,
  endTime: Date,
  require: boolean,
  status: string,
  miles: number,
  isRepeat: boolean,
  address: IAddress;
}
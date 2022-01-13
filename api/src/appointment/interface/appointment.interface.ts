import { Document } from 'mongoose';
import { IAddress } from '../../address';

export interface IAppointment extends Document {
  _id: string;
  type: string;
  client: any;
  funder: string;
  authorizedService: string;
  staff: string;
  placeService: string;
  staffPayCode: string;
  startDate: Date;
  startTime: Date;
  endTime: Date;
  require: boolean;
  eventStatus: string;
  status: string;
  miles: number;
  isRepeat: boolean;
  address: IAddress;
  signature: string;
}
export interface IFilterQuery {
  client: any;
  staff: any;
  status: string;
  eventStatus: string;
  type: string;
}
export interface IRepeat {
  occurency: number;
}

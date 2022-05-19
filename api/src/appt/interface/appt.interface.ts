import { Document } from 'mongoose';
import { FileDTO } from '../../files/dto/file.dto';
import { IAddress } from '../../address';
import * as mongoose from 'mongoose';
import { ApptStatus, EventStatus, ApptType } from '../appt.constants';
import { IAuthorizationService } from '../../client/authorizationservice/interface';

export interface IAppt extends Document {
  _id: string;
  type: string;
  client: any;
  funder: string;
  authorizedService: IAuthorizationService | string;
  staff: string;
  placeService: string;
  staffPayCode: string;
  startDate: Date;
  startTime: Date;
  endTime: Date;
  require: boolean;
  eventStatus: string;
  cancelReason: string;
  status: string;
  miles: number;
  isRepeat: boolean;
  address: IAddress;
  signature: boolean;
  digitalSignature: FileDTO;
}
export interface IFilterQuery {
  client?: mongoose.Types.ObjectId;
  staff?: mongoose.Types.ObjectId;
  status?: ApptStatus;
  eventStatus?: EventStatus;
  type?: ApptType;
}
export interface IRepeat {
  occurency: number;
}

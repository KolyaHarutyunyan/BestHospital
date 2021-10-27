import { Document } from 'mongoose';
import { IStaff } from '../../staff/interface';
import { IAuthorizationService } from '../../client/authorizationservice/interface';
import { IClient } from '../../client/interface'
import { IPayCode } from '../../employment/paycode/interface';

export interface IAppointment extends Document {
  id: string,
  type: string,
  client: IClient,
  authorizedService: IAuthorizationService,
  staff: IStaff,
  staffPayCode: IPayCode,
  startDate: Date,
  startTime: Date,
  endTime: Date,
  require: boolean,
  status: string,
  miles: number,
  isRepeat: boolean
}
import { Document } from 'mongoose';
import { AvailableTypeDTO } from '../dto';

export interface IAvailability extends Document {
  owner: string;
  onModel: string;
  monday: Array<AvailableTypeDTO>;
  tuesday: Array<AvailableTypeDTO>;
  wednesday: Array<AvailableTypeDTO>;
  thursday: Array<AvailableTypeDTO>;
  friday: Array<AvailableTypeDTO>;
  saturday: Array<AvailableTypeDTO>;
  sunday: Array<AvailableTypeDTO>;
}

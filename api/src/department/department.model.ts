import { model, Schema } from 'mongoose';
import { addressSchema } from '../address';
import { IDepartment } from './interface';

const DepartmentSchema = new Schema({
  name: { type: String },
});

export const DepartmentModel = model<IDepartment>('Department', DepartmentSchema);

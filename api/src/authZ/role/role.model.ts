import { model, Schema, Types } from 'mongoose';
import { IRole } from './interface';

/** Role Model */
const roleSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  permissions: [{ type: Types.ObjectId, ref: 'Permission' }],
  isDefault: Boolean,
});

export const RoleModel = model<IRole>('Role', roleSchema);

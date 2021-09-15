import { model, Schema, Types } from 'mongoose';
import { IPermission } from './interface';

/** Permission Model */
const permissionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true, unique: true },
});

export const PermissionModel = model<IPermission>('Permission', permissionSchema);

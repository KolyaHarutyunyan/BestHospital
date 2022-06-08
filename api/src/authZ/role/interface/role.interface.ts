import { Document } from 'mongoose';
import { RoleDTO } from '../dto';
/** The interface type */
export interface IRole extends Document {
  title: string;
  description: string;
  permissions: string[];
  isDefault?: boolean;
}
export interface IRoleCount {
  roles: RoleDTO[];
  count: number;
}

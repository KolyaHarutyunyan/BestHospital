import { Document } from 'mongoose';
/** The interface type */
export interface IPermission extends Document {
  title: string;
  description: string;
  code: number;
}

// export interface IPermissionList {
//   permissio
// }

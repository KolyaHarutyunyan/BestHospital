import {
  addRolePermission,
  createRole,
  deleteRole, deleteRolePermission,
  getRole,
  getRoleById,
  openRole, removeRole,
  searchRoles
} from "./role.action";

export { roleReducer } from './role.reducer';
export { watchRole } from './role.saga';

export const roleActions = {
  createRole,
  getRole,
  deleteRole,
  getRoleById,
  searchRoles,
  openRole,
  removeRole,


  addRolePermission,
  deleteRolePermission


}


import {createPermission, deletePermission, getPermissions, openRole, searchRoles} from "./permissions.action";

export {permissionsReducer} from './permissions.reducer';
export {watchPermission} from './permissions.saga';


export const permissionsActions = {
  createPermission,
  getPermissions,
  deletePermission,

}


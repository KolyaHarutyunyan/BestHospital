import {
  createAdmin,
  filterAdmins,
  getAdminById,
  getAdmins,
  clearAdminById,
  activateAdmin,
  inactivateAdmin,
  editAdmin
} from "./admin.action";

export { adminReducer } from './admin.reducer';
export { watchAdmin } from './admin.saga';

export const adminActions = {
  createAdmin,
  getAdmins,
  getAdminById,
  clearAdminById,
  filterAdmins,
  editAdmin,

  activateAdmin,
  inactivateAdmin

}



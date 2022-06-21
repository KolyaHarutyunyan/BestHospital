import {
   createAdmin,
   getAdminById,
   getAdmins,
   changeAdminStatus,
   editAdminById,
   createCredential,
   getCredential,
   editCredentialById,
   deleteCredentialById,
   getEmployment,
   createEmployment,
   getPayCode,
   editEmployment,
   createPayCode,
   createStaffService,
   getStaffService,
   deleteStaffService,
   isClinician,
   getTimesheet,
   createTimesheet,
   getAllPaycodes,
   getAllAdmins,
   editPayCode,
   terminatePaycode,
   getTimesheetById,
   editTimesheet,
   clearAllPaycodes,
} from "./admin.action";

export { adminReducer } from "./admin.reducer";
export { watchAdmin } from "./admin.saga";

export const adminActions = {
   createAdmin,
   getAdmins,
   getAdminById,
   changeAdminStatus,
   editAdminById,
   createCredential,
   getCredential,
   editCredentialById,
   deleteCredentialById,
   getEmployment,
   createEmployment,
   editEmployment,
   getPayCode,
   createPayCode,
   createStaffService,
   getStaffService,
   deleteStaffService,
   isClinician,
   getTimesheet,
   getTimesheetById,
   createTimesheet,
   editTimesheet,
   getAllPaycodes,
   getAllAdmins,
   editPayCode,
   terminatePaycode,
   clearAllPaycodes,
};

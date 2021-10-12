import {
    createAdmin,
    getAdminById,
    getAdmins,
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
    getTimesheet, createTimesheet
} from "./admin.action";

export {adminReducer} from './admin.reducer';
export {watchAdmin} from './admin.saga';

export const adminActions = {
    createAdmin,
    getAdmins,
    getAdminById,
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
    getTimesheet,
    createTimesheet
}



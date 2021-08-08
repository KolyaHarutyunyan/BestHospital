import {
    createAdmin,
    getAdminById,
    getAdmins,
    editAdminById,

    createCredential,
    getCredentialById,
    editCredentialById,
    deleteCredentialById
} from "./admin.action";

export {adminReducer} from './admin.reducer';
export {watchAdmin} from './admin.saga';

export const adminActions = {
    createAdmin,
    getAdmins,
    getAdminById,
    editAdminById,

    createCredential,
    getCredentialById,
    editCredentialById,
    deleteCredentialById
}



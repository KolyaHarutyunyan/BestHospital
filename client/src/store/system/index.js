import {
    createCredentialGlobal,
    getCredential,
    editCredentialByIdGlobal,
    deleteCredentialByIdGlobal,

    createServiceGlobal,
    getServices,
    editServiceByIdGlobal,
    deleteServiceByIdGlobal,

    createDepartmentGlobal,
    getDepartments,
    editDepartmentByIdGlobal,
    deleteDepartmentByIdGlobal,

    createJobGlobal,
    getJobs,
    editJobByIdGlobal,
    deleteJobByIdGlobal,

} from "./system.action";

export {systemReducer} from './system.reducer';
export {watchSystem} from './system.saga';

export const systemActions = {
    createCredentialGlobal,
    getCredential,
    editCredentialByIdGlobal,
    deleteCredentialByIdGlobal,

    createServiceGlobal,
    getServices,
    editServiceByIdGlobal,
    deleteServiceByIdGlobal,

    createDepartmentGlobal,
    getDepartments,
    editDepartmentByIdGlobal,
    deleteDepartmentByIdGlobal,

    createJobGlobal,
    getJobs,
    editJobByIdGlobal,
    deleteJobByIdGlobal,
}
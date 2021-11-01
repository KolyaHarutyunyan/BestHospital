import {
    createCredentialGlobal,
    getCredentialGlobal,
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
    createPlaceGlobal,
    getPlaces,
    editPlaceByIdGlobal,
    deletePlaceByIdGlobal,

} from "./system.action";

export {systemReducer} from './system.reducer';
export {watchSystem} from './system.saga';

export const systemActions = {
    /** Credential */
    createCredentialGlobal,
    getCredentialGlobal,
    editCredentialByIdGlobal,
    deleteCredentialByIdGlobal,
    /** End */
    /** Service */
    createServiceGlobal,
    getServices,
    editServiceByIdGlobal,
    deleteServiceByIdGlobal,
    /** End */
    /** Department */
    createDepartmentGlobal,
    getDepartments,
    editDepartmentByIdGlobal,
    deleteDepartmentByIdGlobal,
    /** End */
    /** Job */
    createJobGlobal,
    getJobs,
    editJobByIdGlobal,
    deleteJobByIdGlobal,
    /** End */
    /** Place */
    createPlaceGlobal,
    getPlaces,
    editPlaceByIdGlobal,
    deletePlaceByIdGlobal,
    /** End */
}
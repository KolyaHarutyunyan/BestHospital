import {
    createCredentialGlobal,
    getCredential,
    editCredentialByIdGlobal,
    createServiceGlobal,
    getServices,
    editServiceByIdGlobal,
    deleteServiceByIdGlobal,
} from "./system.action";

export {systemReducer} from './system.reducer';
export {watchSystem} from './system.saga';

export const systemActions = {
    createCredentialGlobal,
    getCredential,
    editCredentialByIdGlobal,
    createServiceGlobal,
    getServices,
    editServiceByIdGlobal,
    deleteServiceByIdGlobal
}
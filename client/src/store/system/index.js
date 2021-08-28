import {
    createCredentialGlobal,
    getCredential,
    editCredentialByIdGlobal,
} from "./system.action";

export {systemReducer} from './system.reducer';
export {watchSystem} from './system.saga';

export const systemActions = {
    createCredentialGlobal,
    getCredential,
    editCredentialByIdGlobal,
}
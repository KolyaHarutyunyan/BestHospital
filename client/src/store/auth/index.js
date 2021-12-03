import {
    logIn,
    logOut,
    clearError,
    getRecoveryLink,
    tryAgain,
    resetPassword,
    removeSuccess,
    changePassword,
    getMyAuth,
    getMyProfile, getAccess, assignAccess, removeAccess
} from './auth.action';
export { authReducer } from './auth.reducer';
export { watchAuth } from './auth.saga';
export { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAIL, LOG_OUT, CLEAR_ERROR, } from './auth.types';

export const authActions = {
    logIn,
    logOut,
    getMyAuth,
    getRecoveryLink,
    tryAgain,
    resetPassword,
    removeSuccess,
    clearError,
    changePassword,
    getMyProfile,
    /** Access service */
    getAccess,
    assignAccess,
    removeAccess,
    /** End */
};
import {
    logIn,
    logOut,
    clearError,
    getRecoveryLink,
    tryAgain,
    resetPassword,
    removeSuccess,
    changePassword
} from './auth.action';
export { authReducer } from './auth.reducer';
export { watchAuth } from './auth.saga';
export { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAIL, LOG_OUT, CLEAR_ERROR, } from './auth.types';

export const authActions = {
    logIn,
    logOut,
    getRecoveryLink,
    tryAgain,
    resetPassword,
    removeSuccess,
    clearError,
    changePassword,
};



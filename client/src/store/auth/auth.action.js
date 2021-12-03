import {
    ASSIGN_ACCESS,
    CHANGE_PASSWORD_REQUEST, GET_ACCESS, GET_MY_AUTHN, GET_MY_PROFILE,
    GET_RECOVERY_LINK,
    GET_RECOVERY_LINK_TRY_AGAIN,
    LOG_IN,
    LOG_OUT, REMOVE_ACCESS,
    RESET_PASSWORD_CLEAR,
    RESET_PASSWORD_REQUEST,
} from './auth.types';
import { CLEAR_ERROR } from "../app";

export const logIn = (user) => {
    return {
        type: LOG_IN,
        payload: user,
    };
};

export const logOut = () => {
    return {
        type: LOG_OUT,
    };
};

export const getMyAuth = () => {
    return {
        type: GET_MY_AUTHN,
    };
};

export const getMyProfile = (type) => {
    return {
        type: GET_MY_PROFILE,
        payload:{type}
    };
};

export const getRecoveryLink = (email) => {
    return {
        type: GET_RECOVERY_LINK,
        payload:{email}
    };
};
export const resetPassword = (passwords) => {
    return {
        type: RESET_PASSWORD_REQUEST,
        payload:{passwords}
    };
};

export const changePassword =(data)=>{
    return{
        type:CHANGE_PASSWORD_REQUEST,
        payload:{data}
    }
}

export const removeSuccess = () => {
    return {
        type: RESET_PASSWORD_CLEAR,
    };
};

export const tryAgain = () => {
    return {
        type: GET_RECOVERY_LINK_TRY_AGAIN,
    };
};


export const clearError = () => {
    return {
        type: CLEAR_ERROR,
    };
};


/** Access service */
export const getAccess = ( userId ) =>{
    return {
        type: GET_ACCESS,
        payload: { userId }
    }
}

export const assignAccess = ( userId, roleId ) =>{
    return {
        type: ASSIGN_ACCESS,
        payload: { userId, roleId }
    }
}

export const removeAccess = ( userId, roleId ) =>{
    return {
        type: REMOVE_ACCESS,
        payload: { userId, roleId }
    }
}


/** End */




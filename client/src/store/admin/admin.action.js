import {
    CREATE_ADMIN,
    EDIT_ADMIN_BY_ID,
    GET_ADMIN_BY_ID,
    GET_ADMINS,
    CREATE_CREDENTIAL,
    GET_CREDENTIAL,
    EDIT_CREDENTIAL_BY_ID,
    DELETE_CREDENTIAL_BY_ID, GET_EMPLOYMENT, CREATE_EMPLOYMENT, CREATE_SERVICE
} from "./admin.types";

export const createAdmin = (body) => {
    return {
        type: CREATE_ADMIN,
        payload: {body}
    }
}

export const editAdminById = (body, id) => {
    return {
        type: EDIT_ADMIN_BY_ID,
        payload: {body, id}
    }
}

export const getAdmins = (data) => {
    return {
        type: GET_ADMINS,
        payload: {data}
    }
}

export const getAdminById = (adminId) => {
    return {
        type: GET_ADMIN_BY_ID,
        payload: {adminId}
    }
}

export const createCredential = (body) => {
    return {
        type: CREATE_CREDENTIAL,
        payload: {body}
    }
}

export const getCredential = (credentialId) => {
    return {
        type: GET_CREDENTIAL,
        payload: {credentialId}
    }
}

export const editCredentialById = (body, id, credentialId) => {
    return {
        type: EDIT_CREDENTIAL_BY_ID,
        payload: {body, id,credentialId}
    }
}
export const deleteCredentialById = (id,credentialId) => {

    return {
        type: DELETE_CREDENTIAL_BY_ID,
        payload: {id,credentialId}
    }
}

export const getEmployment = (id) => {
    return {
        type: GET_EMPLOYMENT,
        payload: {id}
    }
}

export const createEmployment = (body) => {
    return {
        type: CREATE_EMPLOYMENT,
        payload: {body}
    }
}


export const createService = (body) => {
    return {
        type: CREATE_SERVICE,
        payload: {body}
    }
}
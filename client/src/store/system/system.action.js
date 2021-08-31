import {
    CREATE_CREDENTIAL_GLOBAL,
    GET_CREDENTIAL,
    EDIT_CREDENTIAL_BY_ID_GLOBAL,
    CREATE_SERVICE_GLOBAL,
    GET_SERVICES,
    EDIT_SERVICE_BY_ID_GLOBAL,
    DELETE_SERVICE_BY_ID_GLOBAL,
} from "./system.type";

// credential

export const createCredentialGlobal = (body) => {
    return {
        type: CREATE_CREDENTIAL_GLOBAL,
        payload: {body}
    }
}

export const getCredential = () => {
    return {
        type: GET_CREDENTIAL,
    }
}

export const editCredentialByIdGlobal = (body, id) => {
    return {
        type: EDIT_CREDENTIAL_BY_ID_GLOBAL,
        payload: {body, id}
    }
}

// credential

// service

export const createServiceGlobal = (body) => {
    return {
        type: CREATE_SERVICE_GLOBAL,
        payload: {body}
    }
}

export const getServices = () => {
    return {
        type: GET_SERVICES,
    }
}

export const editServiceByIdGlobal = (body, id) => {
    return {
        type: EDIT_SERVICE_BY_ID_GLOBAL,
        payload: {body, id}
    }
}

export const deleteServiceByIdGlobal = (id) => {
    return {
        type: DELETE_SERVICE_BY_ID_GLOBAL,
        payload: {id}
    }
}

// service
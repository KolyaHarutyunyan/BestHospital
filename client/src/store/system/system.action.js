import {
    CREATE_CREDENTIAL_GLOBAL,
    GET_CREDENTIAL,
    EDIT_CREDENTIAL_BY_ID_GLOBAL,
} from "./system.type";

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
    console.log(body);
    console.log(id,'id');
    return {
        type: EDIT_CREDENTIAL_BY_ID_GLOBAL,
        payload: {body, id}
    }
}
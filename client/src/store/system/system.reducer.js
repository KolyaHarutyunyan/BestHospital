import {
    CREATE_CREDENTIAL_GLOBAL_SUCCESS,
    EDIT_CREDENTIAL_BY_ID_GLOBAL_SUCCESS,
    GET_CREDENTIAL_SUCCESS
} from "./system.type";

const initialState = {
    credentials: [],
    credentialById: []
};

export const systemReducer = (state = initialState, action) => {

    switch (action.type) {

        case CREATE_CREDENTIAL_GLOBAL_SUCCESS :
            return {
                ...state,
                credentialById: action.payload
            }

        case GET_CREDENTIAL_SUCCESS :
            return {
                ...state,
                credentials: action.payload
            }
        case EDIT_CREDENTIAL_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                credentialById: action.payload
            }
        default:
            return state;
    }
};
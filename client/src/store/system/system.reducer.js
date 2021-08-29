import {
    CREATE_CREDENTIAL_GLOBAL_SUCCESS, CREATE_SERVICE_GLOBAL_SUCCESS, DELETE_SERVICE_BY_ID_GLOBAL_SUCCESS,
    EDIT_CREDENTIAL_BY_ID_GLOBAL_SUCCESS, EDIT_SERVICE_BY_ID_GLOBAL_SUCCESS,
    GET_CREDENTIAL_SUCCESS, GET_SERVICES_SUCCESS
} from "./system.type";

const initialState = {
    credentials: [],
    credentialById: [],
    services: [],
    servicesById: []
};

export const systemReducer = (state = initialState, action) => {

    switch (action.type) {
        // credential
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
          // credential

            // service
        case CREATE_SERVICE_GLOBAL_SUCCESS :
            return {
                ...state,
                servicesById: action.payload
            }

        case GET_SERVICES_SUCCESS :
            return {
                ...state,
                services: action.payload
            }
        case EDIT_SERVICE_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                servicesById: action.payload
            }
        case DELETE_SERVICE_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                servicesById: {}
            }

            //service
        default:
            return state;
    }
};
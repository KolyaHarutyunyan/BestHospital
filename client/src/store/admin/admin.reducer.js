import {
    EDIT_ADMIN_BY_ID_SUCCESS,
    GET_ADMIN_BY_ID,
    GET_ADMIN_BY_ID_SUCCESS,
    GET_ADMINS,
    GET_ADMINS_SUCCESS,
    CREATE_CREDENTIAL_SUCCESS,
    GET_CREDENTIAL_SUCCESS,
    EDIT_CREDENTIAL_BY_ID_SUCCESS,
    DELETE_CREDENTIAL_BY_ID_SUCCESS, CREATE_ADMIN_SUCCESS
} from "./admin.types";
import {paginate} from "@eachbase/utils";

const initialState = {
    adminsList: [],
    adminsListReserve: [],
    adminInfoById: '',
    credential: [],
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ADMIN_SUCCESS:
            return {
                ...state,
                adminsList: [action.payload, ...state.adminsList]
            }

        case GET_ADMINS_SUCCESS:
            return {
                ...state,
                adminsList: action.payload,
                adminsListReserve: action.payload,
            }

        case EDIT_ADMIN_BY_ID_SUCCESS:
            return {
                ...state,
                adminInfoById: action.payload,
            }

        case  GET_ADMIN_BY_ID_SUCCESS:
            return {
                ...state,
                adminInfoById: action.payload,
            }
        case GET_ADMIN_BY_ID :
            return {
                ...state,
                adminInfoById: action.payload.adminId
            }

        case CREATE_CREDENTIAL_SUCCESS :
            return {
                ...state,
                credentialById: action.payload
            }

        case GET_CREDENTIAL_SUCCESS :
            return {
                ...state,
                credential: action.payload
            }
        case EDIT_CREDENTIAL_BY_ID_SUCCESS :
            return {
                ...state,
                credentialById: action.payload
            }

        case DELETE_CREDENTIAL_BY_ID_SUCCESS :
            return {
                ...state,
                credentialById: ''
            }
        default:
            return state;
    }
};

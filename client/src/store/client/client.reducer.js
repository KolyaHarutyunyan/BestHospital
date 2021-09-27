import {
    GET_CLIENTS_SUCCESS,
    GET_CLIENT_BY_ID_SUCCESS,
    GET_CLIENT_CONTACTS_SUCCESS,
    GET_CLIENT_ENROLLMENT_SUCCESS,
    GET_CLIENT_AUTHORIZATION_SUCCESS,
    GET_CLIENT_HISTORIES_SUCCESS,
    GET_CLIENT_NOTES_SUCCESS,
    CREATE_CLIENT_NOTE_SUCCESS,
    CREATE_CLIENT_CONTACT_SUCCESS, CREATE_CLIENT_SUCCESS, GET_CLIENT_AUTHORIZATION_SERV_SUCCESS
} from "./client.types";
import {paginate} from "@eachbase/utils";


const initialState = {
    clientList: [],
    clientItemInfo : {},
    clientContacts : [],
    clientEnrollment : [],
    clientsAuthorizations : [],
    clientHistories : [],
    clientsNotes : []
};

export const clientReducer = (state = initialState, action) => {
    switch (action.type) {

        case  GET_CLIENTS_SUCCESS:
            return {
                ...state,
                clientList: action.payload ,
                clientContacts : [],
                clientEnrollment : [],
                clientsAuthorizations : [],
                clientsAuthorizationsServices : [],
                clientHistories : [],
                clientsNotes : []
            }


        case  GET_CLIENT_BY_ID_SUCCESS:
            return {
                ...state,
                clientItemInfo: action.payload,
            }
        case  GET_CLIENT_CONTACTS_SUCCESS:
            return {
                ...state,
                clientContacts: action.payload,
            }
            case  CREATE_CLIENT_CONTACT_SUCCESS:
            return {
                ...state,
                clientContacts: [...state.clientContacts,action.payload],
            }
            case  GET_CLIENT_ENROLLMENT_SUCCESS:
            return {
                ...state,
                clientEnrollment: action.payload,
            }
        case  GET_CLIENT_AUTHORIZATION_SUCCESS:
            return {
                ...state,
                clientsAuthorizations: action.payload,
            }
        case  GET_CLIENT_AUTHORIZATION_SERV_SUCCESS:
            return {
                ...state,
                clientsAuthorizationsServices: action.payload,
            }
        case  GET_CLIENT_HISTORIES_SUCCESS:
            return {
                ...state,
                clientHistories: action.payload,
            }
            case  GET_CLIENT_NOTES_SUCCESS:
            return {
                ...state,
                clientsNotes: action.payload,
            }
            case  CREATE_CLIENT_NOTE_SUCCESS:
            return {
                ...state,
                clientsNotes: [...state.clientsNotes, action.payload],
            }
        default:
            return state;
    }
};

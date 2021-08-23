import {
    GET_CLIENTS_SUCCESS,
    GET_CLIENT_BY_ID_SUCCESS, GET_CLIENT_CONTACTS_SUCCESS, GET_CLIENT_ENROLLMENT_SUCCESS
} from "./client.types";
import {paginate} from "@eachbase/utils";


const initialState = {
    clientList: [],
    clientItemInfo : {},
    clientContacts : [],
    clientEnrollment : [],

};

export const clientReducer = (state = initialState, action) => {
    switch (action.type) {

        case  GET_CLIENTS_SUCCESS:
            return {
                ...state,
                clientList: paginate((action.payload), 5) ,
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
            case  GET_CLIENT_ENROLLMENT_SUCCESS:
            return {
                ...state,
                clientEnrollment: action.payload,
            }
        default:
            return state;
    }
};

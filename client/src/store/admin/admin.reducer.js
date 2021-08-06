import {
    EDIT_ADMIN_BY_ID_SUCCESS,
    FILTER_BY_FIRST_NAME, GET_ADMIN_BY_ID, GET_ADMIN_BY_ID_CLEAR,
    GET_ADMIN_BY_ID_SUCCESS,
    GET_ADMINS,
    GET_ADMINS_SUCCESS,
} from "./admin.types";
import {paginate} from "@eachbase/utils";
import {filterByFirstName} from "@eachbase/utils";

const initialState = {
    adminsList: [],
    adminsListReserve: [],
    adminInfoById: '',
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ADMINS:
            return {...state, adminsList: '',}

        case GET_ADMINS_SUCCESS:
            return {
                ...state,
                adminsList: paginate((action.payload), 10),
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

        case  GET_ADMIN_BY_ID_CLEAR:
            return {
                ...state,
                adminInfoById: '',
            }
        case GET_ADMIN_BY_ID :
            return {
                ...state,
                adminInfoById: action.payload.adminId
            }

        case FILTER_BY_FIRST_NAME:
            return {
                ...state,
                adminsList: filterByFirstName(action.payload.data, state.adminsListReserve)
            }


        default:
            return state;
    }
};

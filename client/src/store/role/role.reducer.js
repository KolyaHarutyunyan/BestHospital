import {
    GET_ROLE, GET_ROLE_BY_ID_SUCCESS,
    GET_ROLE_SUCCESS,
    OPEN_ROLE, REMOVE_ROLE,
    SEARCH_ROLE
} from "./role.types";

const initialState = {
    rolesList: [],
    rolesListReserve: [],
    role: []
};

export const roleReducer =  (state = initialState, action) => {
    switch (action.type) {

        case  GET_ROLE:
            return {
                ...state,
                rolesList: ""
            };
        case  GET_ROLE_SUCCESS:
            return {
                ...state,
                rolesList: action.payload,
                rolesListReserve: action.payload
            };


        case SEARCH_ROLE: {
            const filterItems = (query) => {
                return state.rolesListReserve.filter((el) => el.title.toLowerCase().indexOf(query.toLowerCase()) > -1);
            };
            return {
                ...state,
                rolesList: filterItems(action.payload.name)
            };
        }

        case  OPEN_ROLE:
            return {
                ...state,
                role: action.payload.role
            };
        case  REMOVE_ROLE:
            return {
                ...state,
                role: []
            };

        case  GET_ROLE_BY_ID_SUCCESS:
            return {
                ...state,
                role: action.payload
            };


        default:
            return state;
    }
};

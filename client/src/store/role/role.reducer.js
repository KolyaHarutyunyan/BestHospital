import {
  CREATE_ROLE_SUCCESS, DELETE_ROLE_PERMISSION_SUCCESS,
  DELETE_ROLE_SUCCESS,
  GET_ROLE, GET_ROLE_BY_ID_SUCCESS,
  GET_ROLE_SUCCESS,
  OPEN_ROLE,
  SEARCH_ROLE
} from "./role.types";

const initialState = {
  rolesList: [],
  rolesListReserve: [],
  role: []
};

export const roleReducer = (state = initialState, action) => {
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

    case CREATE_ROLE_SUCCESS:
      return {
        ...state,
        rolesList: [...state.rolesList, action.payload]

      };


    case DELETE_ROLE_SUCCESS:
      return [...state.rolesList.filter(a => a.id !== action.id)];

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

    case  GET_ROLE_BY_ID_SUCCESS:
      return {
        ...state,
        role: action.payload
      };


    default:
      return state;
  }
};

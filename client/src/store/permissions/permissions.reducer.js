import {GET_PERMISSIONS, GET_PERMISSIONS_SUCCESS,} from "./permissions.types";

const initialState = {
  permissionsList:[]
};

export const permissionsReducer = (state = initialState, action) => {
  switch ( action.type ) {

    case  GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissionsList: action.payload,
      }




    default:
      return state;
  }
};

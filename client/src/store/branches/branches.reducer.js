import {GET_BRANCHES_SUCCESS} from "./branches.types";


const initialState = {
  branchesList:[]
};

export const branchReducer = (state = initialState, action) => {
  switch ( action.type ) {

    case  GET_BRANCHES_SUCCESS:
      return {
        ...state,
        branchesList: action.payload

            // paginate((action.payload), 10),
      }



    default:
      return state;
  }
};

import {GET_FUNDING_SOURCE_SUCCESS} from "./fundingSource.types";


const initialState = {
  fundingSourceList:[]
};

export const fundingSourceReducer = (state = initialState, action) => {
  switch ( action.type ) {

    case  GET_FUNDING_SOURCE_SUCCESS:
      return {
        ...state,
        fundingSourceList: action.payload

            // paginate((action.payload), 10),
      }



    default:
      return state;
  }
};

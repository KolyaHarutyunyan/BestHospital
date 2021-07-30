import {GET_FUNDING_SOURCE_BY_ID_SUCCESS, GET_FUNDING_SOURCE_SUCCESS} from "./fundingSource.types";
import {paginate} from "@eachbase/utils";


const initialState = {
  fundingSourceList:[],
  fundingSourceItem :null
};

export const fundingSourceReducer = (state = initialState, action) => {
  switch ( action.type ) {

    case  GET_FUNDING_SOURCE_SUCCESS:
      return {
        ...state,
        fundingSourceList: paginate((action.payload), 10),
      }
    case  GET_FUNDING_SOURCE_BY_ID_SUCCESS:
      console.log(action.payload.email,'reducer')
      return {
        ...state,
        fundingSourceItem: action.payload,
      }



    default:
      return state;
  }
};

import {CLEAR_OFFICE_BY_ID, GET_OFFICE_BY_ID_SUCCESS, GET_OFFICES, GET_OFFICES_SUCCESS} from "./offices.types";
import {paginate} from "@eachbase/utils";

const initialState = {
  officesList:[],
  officesListReserve:[],
  officeById: null
};

export const officeReducer = (state = initialState, action) => {
  switch ( action.type ) {

    case GET_OFFICES_SUCCESS:
      return {
        ...state,
        officesList: paginate((action.payload), 10),
        officesListReserve:action.payload,
      }

    case GET_OFFICE_BY_ID_SUCCESS:
      return {
        ...state,
        officeById: action.payload
      }

    case CLEAR_OFFICE_BY_ID:
      return {
        ...state,
        officeById: ''
      }

    default:
      return state;
  }
};

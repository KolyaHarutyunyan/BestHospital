import {
  APPEND_SUCCESS,
  REMOVE_SUCCESS,
} from "./http_requests_on_success.types";
const initialState = [];

export const httpRequestsOnSuccessReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_SUCCESS:
      return [...state, action.payload];
    case REMOVE_SUCCESS:
      return state.filter((successData) => successData.type !== action.payload);
    default:
      return state;
  }
};

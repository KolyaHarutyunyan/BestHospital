import { APPEND_ERROR, REMOVE_ERROR } from "./http_requests_on_errors.types";
const initialState = [];

export const httpRequestsOnErrorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_ERROR:
      return [...state, action.payload];
    case REMOVE_ERROR:
      return state.filter((error) => error.type !== action.payload);
    default:
      return state;
  }
};

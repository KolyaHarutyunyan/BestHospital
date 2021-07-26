import { APPEND_LOADING, REMOVE_LOADING } from "./http_requests_on_load.types";
const initialState = [];

export const httpRequestsOnLoadReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_LOADING:
      return [...state, action.payload];
    case REMOVE_LOADING:
      return state.filter((loading) => loading !== action.payload);
    default:
      return state;
  }
};

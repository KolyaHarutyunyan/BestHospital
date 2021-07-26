import { APPEND_LOADING, REMOVE_LOADING } from "./http_requests_on_load.types";

export const httpRequestsOnLoadActions = {
  appendLoading: (loadingType) => ({
    type: APPEND_LOADING,
    payload: loadingType,
  }),
  removeLoading: (loadingType) => ({
    type: REMOVE_LOADING,
    payload: loadingType,
  }),
};

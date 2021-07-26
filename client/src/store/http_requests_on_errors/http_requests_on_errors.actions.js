import { APPEND_ERROR, REMOVE_ERROR } from "./http_requests_on_errors.types";

export const httpRequestsOnErrorsActions = {
  appendError: (type, error = true) => ({
    type: APPEND_ERROR,
    payload: {
      type,
      error,
    },
  }),
  removeError: (errorType) => ({
    type: REMOVE_ERROR,
    payload: errorType,
  }),
};

import { GET_HISTORY } from "./history.type";

export const getHistory = (onModel, queryParams) => {
   return {
      type: GET_HISTORY,
      payload: { onModel, queryParams },
   };
};

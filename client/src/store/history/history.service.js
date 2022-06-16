import axios from "axios";

export const historyService = {
   getHistoryService: (onModel, queryParams) =>
      axios.get(`/history/${onModel}`, { auth: true, params: { ...queryParams } }),
};

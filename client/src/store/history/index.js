import { getHistory } from "./history.action";

export { historyReducer } from "./history.reducer";
export { watchHistory } from "./history.saga";

export const historyActions = {
   getHistory,
};

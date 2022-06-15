import { GET_HISTORY_SUCCESS } from "./history.type";

const initialState = {
   history: [],
};

export const historyReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_HISTORY_SUCCESS:
         return {
            ...state,
            history: action.payload.history,
         };

      default:
         return state;
   }
};

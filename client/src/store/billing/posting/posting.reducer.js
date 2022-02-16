import { GET_POSTINGS_SUCCESS, GET_POSTING_BY_ID_SUCCESS } from "./posting.type";

const initialState = {
   postings: [],
   postingById: {},
};

export const postingReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_POSTINGS_SUCCESS:
         return {
            ...state,
            postings: action.payload.postings,
         };

      case GET_POSTING_BY_ID_SUCCESS:
         return {
            ...state,
            postingById: action.payload.postingById,
         };
      default:
         return state;
   }
};

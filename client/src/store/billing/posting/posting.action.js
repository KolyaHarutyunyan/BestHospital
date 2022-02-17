import {
   CREATE_POSTING,
   DELETE_POSTING,
   EDIT_POSTING,
   GET_POSTINGS,
   GET_POSTING_BY_ID,
} from "./posting.type";

export const getPostings = () => {
   return {
      type: GET_POSTINGS,
   };
};

export const getPostingById = (id) => {
   return {
      type: GET_POSTING_BY_ID,
      payload: { id },
   };
};

export const createPosting = (body) => {
   return {
      type: CREATE_POSTING,
      payload: { body },
   };
};

export const editPosting = (id, body) => {
   return {
      type: EDIT_POSTING,
      payload: { id, body },
   };
};

export const deletePosting = (id) => {
   return {
      type: DELETE_POSTING,
      payload: { id },
   };
};

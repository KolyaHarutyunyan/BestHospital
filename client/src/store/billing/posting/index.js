import {
   getPostings,
   getPostingById,
   createPosting,
   editPosting,
   deletePosting,
} from "./posting.action";

export { postingReducer } from "./posting.reducer";
export { watchPosting } from "./posting.saga";

export const postingActions = {
   getPostings,
   getPostingById,
   createPosting,
   editPosting,
   deletePosting,
};

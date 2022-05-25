import {
   CHANGE_FUNDING_SOURCE_STATUS,
   CREATE_FUNDING_SOURCE,
   DELETE_FUNDING_SOURCE,
   EDIT_FUNDING_SOURCE,
   GET_FUNDING_SOURCES,
   GET_FUNDING_SOURCE_BY_ID,
} from "./funding.type";

export const createFundingSource = (body) => {
   return {
      type: CREATE_FUNDING_SOURCE,
      payload: { body },
   };
};

export const editFundingSource = (id, body) => {
   return {
      type: EDIT_FUNDING_SOURCE,
      payload: { id, body },
   };
};

export const getFundingSources = (data) => {
   return {
      type: GET_FUNDING_SOURCES,
      payload: { data },
   };
};

export const getFundingSourceById = (id) => {
   return {
      type: GET_FUNDING_SOURCE_BY_ID,
      payload: { id },
   };
};

export const deleteFundingSource = (id) => {
   return {
      type: DELETE_FUNDING_SOURCE,
      payload: { id },
   };
};

export const changeFundingSourceStatus = (id, status, reason) => {
   return {
      type: CHANGE_FUNDING_SOURCE_STATUS,
      payload: { id, status, reason },
   };
};

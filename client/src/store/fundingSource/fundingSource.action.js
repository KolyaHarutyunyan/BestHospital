import {
   CREATE_FUNDING_SOURCE,
   GET_FUNDING_SOURCE,
   GET_FUNDING_SOURCE_BY_ID,
   GET_FUNDING_SOURCE_SERVICE_BY_ID,
   CREATE_FUNDING_SOURCE_SERVICE_BY_ID,
   EDIT_FUNDING_SOURCE,
   EDIT_FUNDING_SOURCE_SERVICE,
   DELETE_FUNDING_SOURCE_SERVICE,
   SET_STATUS,
   CREATE_FUNDING_MODIFIER,
   EDIT_FUNDING_MODIFIER,
   CHANGE_FUNDING_MODIFIER_STATUS,
   CHANGE_FUNDING_SOURCE_STATUS,
} from "./fundingSource.types";

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

export const getFundingSource = (data) => {
   return {
      type: GET_FUNDING_SOURCE,
      payload: { data },
   };
};

export const getFundingSourceById = (id) => {
   return {
      type: GET_FUNDING_SOURCE_BY_ID,
      payload: id,
   };
};

export const getFoundingSourceServiceById = (id) => {
   return {
      type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
      payload: id,
   };
};

export const createFoundingSourceServiceById = (id, body) => {
   return {
      type: CREATE_FUNDING_SOURCE_SERVICE_BY_ID,
      payload: { id, body },
   };
};

export const editFoundingSourceServiceById = (id, body) => {
   return {
      type: EDIT_FUNDING_SOURCE_SERVICE,
      payload: { id, body },
   };
};

export const deleteFoundingSourceServiceById = (id) => {
   return {
      type: DELETE_FUNDING_SOURCE_SERVICE,
      payload: { id },
   };
};

export const setStatus = (id, path, status, body, type) => {
   return {
      type: SET_STATUS,
      payload: { id, path, status, body, type },
   };
};

export const createFundingModifier = (fundingId, body) => {
   return {
      type: CREATE_FUNDING_MODIFIER,
      payload: { fundingId, body },
   };
};

export const editFundingModifier = (fundingId, serviceId, modifierId, body) => {
   return {
      type: EDIT_FUNDING_MODIFIER,
      payload: { fundingId, serviceId, modifierId, body },
   };
};

export const changeFundingModifierStatus = (fundingId, serviceId, modifierId, status) => {
   return {
      type: CHANGE_FUNDING_MODIFIER_STATUS,
      payload: { fundingId, serviceId, modifierId, status },
   };
};

export const changeFundingSourceStatus = (id, status) => {
   return {
      type: CHANGE_FUNDING_SOURCE_STATUS,
      payload: { id, status },
   };
};

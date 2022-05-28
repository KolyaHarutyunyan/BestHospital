import {
   CREATE_FUNDING_SOURCE,
   GET_FUNDING_SOURCE,
   GET_FUNDING_SOURCE_BY_ID,
   GET_FUNDING_SOURCE_SERVICE_BY_ID,
   CREATE_FUNDING_SOURCE_SERVICE_BY_ID,
   GET_FUNDING_SOURCE_HISTORIES_BY_ID,
   GET_FUNDING_SOURCE_SERV,
   CREATE_FUNDING_SOURCE_SERV,
   GET_FUNDING_SOURCE_SERV_BY_ID,
   EDIT_FUNDING_SOURCE,
   EDIT_FUNDING_SOURCE_SERVICE,
   CREATE_FUNDING_SOURCE_SERVICE_MODIFIER,
   GET_ACTIVE_OR_INACTIVE,
   DELETE_FUNDING_SOURCE_SERVICE,
   GET_FUNDING_SOURCE_SERVICE_MODIFIERS,
   EDIT_ACTIVE_OR_INACTIVE,
   EDIT_FUNDING_SOURCE_SERVICE_MODIFIER,
   GET_FUNDING_SOURCE_SERVICE_MODIFIERS_CLIENT,
   SET_STATUS,
   GET_FUNDING_SOURCE_SERVICE_BY_ID_NO_LOAD,
   CREATE_FUNDING_MODIFIER,
   EDIT_FUNDING_MODIFIER,
   DELETE_FUNDING_MODIFIER,
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

export const getFoundingSourceServiceByIdNoLoad = (id) => {
   return {
      type: GET_FUNDING_SOURCE_SERVICE_BY_ID_NO_LOAD,
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

export const createFoundingSourceServiceModifier = (body) => {
   return {
      type: "CREATE_FUNDING_SOURCE_SERVICE_MODIFIER",
      payload: {
         body,
      },
   };
};

export const getFoundingSourceServiceModifiers = (id) => {
   return {
      type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS,
      payload: id,
   };
};

export const getFoundingSourceServiceModifiersForClient = (id) => {
   return {
      type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_CLIENT,
      payload: id,
   };
};

export const getFundingSourceHistoriesById = (onModal, searchDate) => {
   return {
      type: GET_FUNDING_SOURCE_HISTORIES_BY_ID,
      payload: { onModal, searchDate },
   };
};

export const editFoundingSourceModifier = (id, body, fId) => {
   return {
      type: EDIT_FUNDING_SOURCE_SERVICE_MODIFIER,
      payload: {
         id,
         body,
         fId,
      },
   };
};

export const getFundingSourceServ = () => {
   return {
      type: GET_FUNDING_SOURCE_SERV,
   };
};

export const getFundingSourceServById = (id) => {
   return {
      type: GET_FUNDING_SOURCE_SERV_BY_ID,
      payload: { id },
   };
};

export const createFundingSourceServ = (body) => {
   return {
      type: CREATE_FUNDING_SOURCE_SERV,
      payload: { body },
   };
};

export const getActiveOrInactive = (type) => {
   return {
      type: GET_ACTIVE_OR_INACTIVE,
      payload: { type },
   };
};

export const editActiveOrInactive = (id, path, status, body, type) => {
   return {
      type: EDIT_ACTIVE_OR_INACTIVE,
      payload: { id, path, status, body, type },
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

export const editFundingModifier = (fundingId, serviceId, body) => {
   return {
      type: EDIT_FUNDING_MODIFIER,
      payload: { fundingId, serviceId, body },
   };
};

export const deleteFundingModifier = (fundingId, serviceId, modifiersIds) => {
   return {
      type: DELETE_FUNDING_MODIFIER,
      payload: { fundingId, serviceId, modifiersIds },
   };
};

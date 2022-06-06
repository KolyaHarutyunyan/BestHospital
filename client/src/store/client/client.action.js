import {
   CREATE_CLIENT,
   CREATE_CLIENT_AUTHORIZATION,
   CREATE_CLIENT_AUTHORIZATION_SERV,
   CREATE_CLIENT_CONTACT,
   CREATE_CLIENT_ENROLLMENT,
   DELETE_CLIENT,
   DELETE_CLIENT_AUTHORIZATION,
   DELETE_CLIENT_AUTHORIZATION_SERV,
   DELETE_CLIENT_CONTACT,
   DELETE_CLIENT_ENROLLMENT,
   EDIT_CLIENT,
   EDIT_CLIENT_AUTHORIZATION,
   EDIT_CLIENT_AUTHORIZATION_SERV,
   EDIT_CLIENT_CONTACT,
   EDIT_CLIENT_ENROLLMENT,
   GET_CLIENT_AUTHORIZATION,
   GET_CLIENT_AUTHORIZATION_SERV,
   GET_CLIENT_BY_ID,
   GET_CLIENT_CONTACTS,
   GET_CLIENT_ENROLLMENT,
   GET_CLIENT_HISTORIES,
   GET_CLIENTS,
   GET_CLIENT_AUTHORIZATION_MOD_CHECK,
   DELETE_CLIENT_AUTHORIZATION_FILE,
   EDIT_CLIENT_AUTHORIZATION_FILE,
   CREATE_CLIENT_AUTHORIZATION_FILE,
   GET_CLIENT_AUTHORIZATION_FILE,
   ADD_FILES_TO_CLIENT_AUTH,
   REMOVE_FILES_FROM_CLIENT_AUTH,
} from "./client.types";

export const getClients = (data) => {
   return {
      type: GET_CLIENTS,
      payload: { data },
   };
};

export const createClient = (body) => {
   return {
      type: CREATE_CLIENT,
      payload: { body },
   };
};

export const deleteClient = (id) => {
   return {
      type: DELETE_CLIENT,
      payload: { id },
   };
};

export const editClient = (body, id) => {
   return {
      type: EDIT_CLIENT,
      payload: { body, id },
   };
};

export const getClientsById = (id) => {
   return {
      type: GET_CLIENT_BY_ID,
      payload: { id },
   };
};

export const getClientsContacts = (id) => {
   return {
      type: GET_CLIENT_CONTACTS,
      payload: { id },
   };
};

export const createClientContact = (body, id) => {
   return {
      type: CREATE_CLIENT_CONTACT,
      payload: { body, id },
   };
};

export const editClientContact = (body, id, paramsId) => {
   return {
      type: EDIT_CLIENT_CONTACT,
      payload: { body, id, paramsId },
   };
};

export const deleteClientContact = (id, paramsId) => {
   return {
      type: DELETE_CLIENT_CONTACT,
      payload: { id, paramsId },
   };
};

export const getClientsEnrollment = (id) => {
   return {
      type: GET_CLIENT_ENROLLMENT,
      payload: { id },
   };
};

export const createClientEnrollment = (body, id, funderId) => {
   return {
      type: CREATE_CLIENT_ENROLLMENT,
      payload: { body, id, funderId },
   };
};

export const editClientEnrollment = (body, clientId, funderId, id) => {
   return {
      type: EDIT_CLIENT_ENROLLMENT,
      payload: { body, clientId, id, funderId },
   };
};

export const deleteClientEnrollment = (id, clientId) => {
   return {
      type: DELETE_CLIENT_ENROLLMENT,
      payload: { id, clientId },
   };
};

export const getClientsAuthorizations = (id) => {
   return {
      type: GET_CLIENT_AUTHORIZATION,
      payload: { id },
   };
};

export const createClientsAuthorizations = (body, id, funderId) => {
   return {
      type: CREATE_CLIENT_AUTHORIZATION,
      payload: { body, id, funderId },
   };
};

export const editClientsAuthorizations = (body, id, clientId) => {
   return {
      type: EDIT_CLIENT_AUTHORIZATION,
      payload: { body, id, clientId },
   };
};

export const deleteClientsAuthorization = (id, clientId) => {
   return {
      type: DELETE_CLIENT_AUTHORIZATION,
      payload: { id, clientId },
   };
};

export const getClientsAuthorizationsServ = (id) => {
   return {
      type: GET_CLIENT_AUTHORIZATION_SERV,
      payload: { id },
   };
};

// authorization file

export const createClientsAuthorizationFile = (body, createInfo) => {
   return {
      type: CREATE_CLIENT_AUTHORIZATION_FILE,
      payload: { body, createInfo },
   };
};

export const editClientAuthorizationFile = (body, id, clientId) => {
   return {
      type: EDIT_CLIENT_AUTHORIZATION_FILE,
      payload: { body, id, clientId },
   };
};

export const deleteClientAuthorizationFile = (id, clientId) => {
   return {
      type: DELETE_CLIENT_AUTHORIZATION_FILE,
      payload: { id, clientId },
   };
};

export const getClientsAuthorizationFile = (id) => {
   return {
      type: GET_CLIENT_AUTHORIZATION_FILE,
      payload: { id },
   };
};

// end

export const getClientsAuthorizationsServModifiersCheck = (body, id, funderId) => {
   return {
      type: GET_CLIENT_AUTHORIZATION_MOD_CHECK,
      payload: { body, id, funderId },
   };
};

export const createClientsAuthorizationsServ = (body, id, funderId) => {
   return {
      type: CREATE_CLIENT_AUTHORIZATION_SERV,
      payload: { body, id, funderId },
   };
};

export const editClientsAuthorizationsServ = (body, id, authID) => {
   return {
      type: EDIT_CLIENT_AUTHORIZATION_SERV,
      payload: { body, id, authID },
   };
};

export const deleteClientsAuthorizationServ = (id, authID) => {
   return {
      type: DELETE_CLIENT_AUTHORIZATION_SERV,
      payload: { id, authID },
   };
};

export const getClientHistories = (id, onModal) => {
   return {
      type: GET_CLIENT_HISTORIES,
      payload: { id, onModal },
   };
};

export const addFilesToClientAuth = (authId, files) => {
   return {
      type: ADD_FILES_TO_CLIENT_AUTH,
      payload: { authId, files },
   };
};

export const removeFilesFromClientAuth = (authId, docId) => {
   return {
      type: REMOVE_FILES_FROM_CLIENT_AUTH,
      payload: { authId, docId },
   };
};

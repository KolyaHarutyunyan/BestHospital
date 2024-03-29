import {
   GET_CLIENTS_SUCCESS,
   GET_CLIENT_BY_ID_SUCCESS,
   GET_CLIENT_CONTACTS_SUCCESS,
   GET_CLIENT_ENROLLMENT_SUCCESS,
   GET_CLIENT_AUTHORIZATION_SUCCESS,
   CREATE_CLIENT_CONTACT_SUCCESS,
   GET_CLIENT_AUTHORIZATION_SERV_SUCCESS,
   GET_CLIENT_AUTHORIZATION_SERV_ERROR,
   GET_CLIENT_AUTHORIZATION_ERROR,
   GET_CLIENT_AUTHORIZATION_FILE,
   CREATE_CLIENT_AUTHORIZATION_FILE,
   EDIT_CLIENT_AUTHORIZATION_FILE,
   DELETE_CLIENT_AUTHORIZATION_FILE,
} from "./client.types";

const initialState = {
   clientList: [],
   clientItemInfo: {},
   clientContacts: [],
   clientEnrollment: [],
   clientsAuthorizations: [],
   clientsNotes: [],
};

export const clientReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_CLIENTS_SUCCESS:
         return {
            ...state,
            clientList: action.payload,
         };

      case GET_CLIENT_BY_ID_SUCCESS:
         return {
            ...state,
            clientItemInfo: action.payload,
         };
      case GET_CLIENT_CONTACTS_SUCCESS:
         return {
            ...state,
            clientContacts: action.payload,
         };
      case CREATE_CLIENT_CONTACT_SUCCESS:
         return {
            ...state,
            clientContacts: [...state.clientContacts, action.payload],
         };
      case GET_CLIENT_ENROLLMENT_SUCCESS:
         return {
            ...state,
            clientEnrollment: action.payload,
         };
      case GET_CLIENT_AUTHORIZATION_SUCCESS:
         return {
            ...state,
            clientsAuthorizations: action.payload.reverse(),
         };
      case GET_CLIENT_AUTHORIZATION_ERROR:
         return {
            ...state,
            clientsAuthorizations: [],
         };

      case GET_CLIENT_AUTHORIZATION_SERV_SUCCESS:
         return {
            ...state,
            clientsAuthorizationsServices: action.payload,
         };
      case GET_CLIENT_AUTHORIZATION_SERV_ERROR:
         return {
            ...state,
            clientsAuthorizationsServices: [],
         };

      // authorization file

      case CREATE_CLIENT_AUTHORIZATION_FILE:
         return {
            ...state,
            file: action.payload,
         };

      case GET_CLIENT_AUTHORIZATION_FILE:
         return {
            ...state,
            file: action.payload,
         };
      case EDIT_CLIENT_AUTHORIZATION_FILE:
         return {
            ...state,
            file: action.payload,
         };
      case DELETE_CLIENT_AUTHORIZATION_FILE:
         return {
            ...state,
            file: {},
         };

      // end

      default:
         return state;
   }
};

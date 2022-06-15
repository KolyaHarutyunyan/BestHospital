import {
   createClient,
   createClientContact,
   createClientEnrollment,
   createClientsAuthorizations,
   createClientsAuthorizationsServ,
   deleteClient,
   deleteClientContact,
   deleteClientEnrollment,
   deleteClientsAuthorization,
   deleteClientsAuthorizationServ,
   editClient,
   editClientContact,
   editClientEnrollment,
   terminateClientEnrollment,
   editClientsAuthorizations,
   editClientsAuthorizationsServ,
   getClients,
   getClientsAuthorizations,
   getClientsAuthorizationsServ,
   getClientsAuthorizationsServModifiersCheck,
   getClientsById,
   getClientsContacts,
   getClientsEnrollment,
   // authoriztion file
   getClientsAuthorizationFile,
   createClientsAuthorizationFile,
   editClientAuthorizationFile,
   deleteClientAuthorizationFile,
   //end
   addFilesToClientAuth,
   removeFilesFromClientAuth,
   editFileNameOfClientAuth,
} from "./client.action";

export { clientReducer } from "./client.reducer";
export { watchClient } from "./client.saga";

export const clientActions = {
   getClients,
   createClient,
   deleteClient,
   getClientsById,
   editClient,
   getClientsContacts,
   createClientContact,
   getClientsEnrollment,
   createClientEnrollment,
   deleteClientContact,
   editClientContact,
   getClientsAuthorizations,
   editClientEnrollment,
   terminateClientEnrollment,
   deleteClientEnrollment,
   createClientsAuthorizations,
   deleteClientsAuthorization,
   editClientsAuthorizations,
   getClientsAuthorizationsServ,
   createClientsAuthorizationsServ,
   editClientsAuthorizationsServ,
   deleteClientsAuthorizationServ,
   getClientsAuthorizationsServModifiersCheck,

   // authorization file file

   getClientsAuthorizationFile,
   createClientsAuthorizationFile,
   editClientAuthorizationFile,
   deleteClientAuthorizationFile,

   // end
   addFilesToClientAuth,
   removeFilesFromClientAuth,
   editFileNameOfClientAuth,
};

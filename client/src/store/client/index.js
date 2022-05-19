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
   editClientsAuthorizations,
   editClientsAuthorizationsServ,
   getClientHistories,
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
   deleteClientEnrollment,
   createClientsAuthorizations,
   deleteClientsAuthorization,
   editClientsAuthorizations,
   getClientsAuthorizationsServ,
   createClientsAuthorizationsServ,
   editClientsAuthorizationsServ,
   deleteClientsAuthorizationServ,
   getClientHistories,
   getClientsAuthorizationsServModifiersCheck,

   // authorization file file

   getClientsAuthorizationFile,
   createClientsAuthorizationFile,
   editClientAuthorizationFile,
   deleteClientAuthorizationFile,

   // end
   addFilesToClientAuth,
};

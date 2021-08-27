import {
    createClient,
    createClientContact,
    createClientEnrollment,
    createClientsAuthorizations, createClientsAuthorizationsServ,
    deleteClient,
    deleteClientContact,
    deleteClientEnrollment, deleteClientsAuthorization, deleteClientsAuthorizationServ,
    editClient,
    editClientContact,
    editClientEnrollment, editClientsAuthorizations, editClientsAuthorizationsServ,
    getClients,
    getClientsAuthorizations, getClientsAuthorizationsServ,
    getClientsById,
    getClientsContacts,
    getClientsEnrollment,
} from "./client.action";

export {clientReducer} from './client.reducer';
export {watchClient} from './client.saga';

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
    deleteClientsAuthorizationServ
}


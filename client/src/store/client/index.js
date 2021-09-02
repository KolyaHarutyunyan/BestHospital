import {
    createClient,
    createClientContact,
    createClientEnrollment, createClientNote,
    createClientsAuthorizations, createClientsAuthorizationsServ,
    deleteClient,
    deleteClientContact,
    deleteClientEnrollment, deleteClientNote, deleteClientsAuthorization, deleteClientsAuthorizationServ,
    editClient,
    editClientContact,
    editClientEnrollment, editClientNote, editClientsAuthorizations, editClientsAuthorizationsServ, getClientHistories,
    getClients,
    getClientsAuthorizations, getClientsAuthorizationsServ,
    getClientsById,
    getClientsContacts,
    getClientsEnrollment, getClientsNotes,
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
    deleteClientsAuthorizationServ,
    getClientHistories,
    getClientsNotes,
    createClientNote,
    editClientNote,
    deleteClientNote
}


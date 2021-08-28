import {
    createClient,
    createClientContact,
    createClientEnrollment,
    createClientsAuthorizations,
    deleteClient,
    deleteClientContact,
    deleteClientEnrollment, deleteClientsAuthorization,
    editClient,
    editClientContact,
    editClientEnrollment, editClientsAuthorizations,
    getClients,
    getClientsAuthorizations,
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
    editClientsAuthorizations
}


import {
    createClient,
    createClientContact,
    createClientEnrollment,
    deleteClient,
    deleteClientContact,
    deleteClientEnrollment,
    editClient,
    editClientContact,
    editClientEnrollment,
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
    deleteClientEnrollment
}


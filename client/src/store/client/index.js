import {
    createClient,
    createClientContact,
    deleteClient,
    deleteClientContact,
    editClient,
    editClientContact,
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
    deleteClientContact,
    editClientContact,
    getClientsAuthorizations
}


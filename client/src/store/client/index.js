import {
    createClient,
    createClientContact,
    deleteClient,
    editClient, editClientContact,
    getClients,
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
    editClientContact,
    // editClientContact,


}


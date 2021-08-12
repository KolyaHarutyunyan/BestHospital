import {
    createClient,
    deleteClient,
    editClient,
    getClients,
    getClientsById, getClientsContacts,
} from "./client.action";

export {clientReducer} from './client.reducer';
export {watchClient} from './client.saga';

export const clientActions = {
    getClients,
    createClient,
    deleteClient,
    getClientsById,
    editClient,
    getClientsContacts
}


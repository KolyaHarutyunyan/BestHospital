import {
    getClients
} from "./client.action";

export {clientReducer} from './client.reducer';
export {watchClient} from './client.saga';

export const clientActions = {
    getClients,
}


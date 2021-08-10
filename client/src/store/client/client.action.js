import {
    CREATE_CLIENT,
    DELETE_CLIENT,
    GET_CLIENTS,
} from "./client.types";


export const getClients = () => {
    return {
        type: GET_CLIENTS
    }
}

export const createClient = (body) => {
    return {
        type: CREATE_CLIENT,
        payload: {body}
    }
}


export const deleteClient = (id) => {
    return {
        type: DELETE_CLIENT,
        payload: {id}
    }
}
import {
    CREATE_CLIENT,
    DELETE_CLIENT, EDIT_CLIENT,
    GET_CLIENT_BY_ID, GET_CLIENT_CONTACTS,
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

export const editClient = (body, id) => {
    return {
        type: EDIT_CLIENT,
        payload: {
            body,
            id
        }
    }
}

export const getClientsById = (id) => {
    return {
        type: GET_CLIENT_BY_ID,
        payload: {id}
    }
}

export const getClientsContacts = (id) => {
    return {
        type: GET_CLIENT_CONTACTS,
        payload: {id}
    }
}
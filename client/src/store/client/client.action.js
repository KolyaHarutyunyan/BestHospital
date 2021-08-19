import {
    CREATE_CLIENT, CREATE_CLIENT_CONTACT,
    DELETE_CLIENT, DELETE_CLIENT_CONTACT, EDIT_CLIENT, EDIT_CLIENT_CONTACT,
    GET_CLIENT_BY_ID, GET_CLIENT_CONTACTS, GET_CLIENT_ENROLLMENT,
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

export const createClientContact = (body, id) => {
    return {
        type: CREATE_CLIENT_CONTACT,
        payload: {
            body,
            id
        }
    }
}


export const editClientContact = (body, id) => {
    return {
        type: EDIT_CLIENT_CONTACT,
        payload: {
            body,
            id
        }
    }
}


export const deleteClientContact = ( id) => {
    return {
        type: DELETE_CLIENT_CONTACT,
        payload: {id}
    }
}

export const getClientsEnrollment = (id) => {
    return {
        type: GET_CLIENT_ENROLLMENT,
        payload: {id}
    }
}

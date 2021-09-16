import {
    CREATE_AVAILABILITY_SCHEDULE,
    CREATE_CLIENT,
    CREATE_CLIENT_AUTHORIZATION,
    CREATE_CLIENT_AUTHORIZATION_SERV,
    CREATE_CLIENT_CONTACT,
    CREATE_CLIENT_ENROLLMENT,
    CREATE_CLIENT_NOTE, DELETE_AVAILABILITY_SCHEDULE,
    DELETE_CLIENT,
    DELETE_CLIENT_AUTHORIZATION,
    DELETE_CLIENT_AUTHORIZATION_SERV,
    DELETE_CLIENT_CONTACT,
    DELETE_CLIENT_ENROLLMENT,
    DELETE_CLIENT_NOTE, EDIT_AVAILABILITY_SCHEDULE,
    EDIT_CLIENT,
    EDIT_CLIENT_AUTHORIZATION,
    EDIT_CLIENT_AUTHORIZATION_SERV,
    EDIT_CLIENT_CONTACT,
    EDIT_CLIENT_ENROLLMENT,
    EDIT_CLIENT_NOTE,
    GET_CLIENT_AUTHORIZATION,
    GET_CLIENT_AUTHORIZATION_SERV,
    GET_AVAILABILITY_SCHEDULE,
    GET_CLIENT_BY_ID,
    GET_CLIENT_CONTACTS,
    GET_CLIENT_ENROLLMENT,
    GET_CLIENT_HISTORIES,
    GET_CLIENT_NOTES,
    GET_CLIENTS,
} from "./client.types";



export const getClients = (data) => {

    return {
        type: GET_CLIENTS,
        payload: {data}
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

export const editClientContact = (body, id,paramsId) => {
    return {
        type: EDIT_CLIENT_CONTACT,
        payload: {
            body,
            id,
            paramsId
        }
    }
}


export const deleteClientContact = ( id, paramsId) => {
    return {
        type: DELETE_CLIENT_CONTACT,
        payload: {id, paramsId}
    }
}

export const getClientsEnrollment = (id) => {
    return {
        type: GET_CLIENT_ENROLLMENT,
        payload: {id}
    }
}

export const createClientEnrollment = (body, id, funderId) => {
    return {
        type: CREATE_CLIENT_ENROLLMENT,
        payload: {
            body,
            id,
            funderId
        }
    }
}

export const editClientEnrollment = (body, clientId, funderId, id) => {

    return {
        type: EDIT_CLIENT_ENROLLMENT,
        payload: {
            body,
            clientId,
            id,
            funderId
        }
    }
}

export const deleteClientEnrollment = ( id) => {
    return {
        type: DELETE_CLIENT_ENROLLMENT,
        payload: {id}
    }
}



export const getClientsAuthorizations = (id) => {
    return {
        type: GET_CLIENT_AUTHORIZATION,
        payload: {id}
    }
}

export const createClientsAuthorizations = (body, id, funderId) => {
    return {
        type: CREATE_CLIENT_AUTHORIZATION,
        payload: {
            body,
            id,
            funderId
        }
    }
}

export const editClientsAuthorizations = (body,  id) => {

    return {
        type: EDIT_CLIENT_AUTHORIZATION,
        payload: {
            body,
            id,

        }
    }
}

export const deleteClientsAuthorization = ( id) => {
    return {
        type: DELETE_CLIENT_AUTHORIZATION,
        payload: {id}
    }
}

export const getClientsAuthorizationsServ = (id) => {
    return {
        type: GET_CLIENT_AUTHORIZATION_SERV,
        payload: {id}
    }
}


export const createClientsAuthorizationsServ = (body, id, funderId) => {
    return {
        type: CREATE_CLIENT_AUTHORIZATION_SERV,
        payload: {
            body,
            id,
            funderId
        }
    }
}

export const editClientsAuthorizationsServ = (body,  id) => {

    return {
        type: EDIT_CLIENT_AUTHORIZATION_SERV,
        payload: {
            body,
            id,

        }
    }
}

export const deleteClientsAuthorizationServ = ( id) => {
    return {
        type: DELETE_CLIENT_AUTHORIZATION_SERV,
        payload: {id}
    }
}


export const getClientHistories = (id,onModal) => {

    return {
        type: GET_CLIENT_HISTORIES,
        payload: {id,onModal}
    }
}

export const getClientsNotes = (id,onModal) => {
    return {
        type: GET_CLIENT_NOTES,
        payload: {id,onModal}
    }
}

export const createClientNote = (body) => {

    return {
        type: CREATE_CLIENT_NOTE,
        payload: {
            body
        }
    }
}

export const editClientNote = (fId, id, body) => {

    return {
        type: EDIT_CLIENT_NOTE,
        payload: {fId, body, id,}
    }
}

export const deleteClientNote = (fId, id) => {
    return {
        type: DELETE_CLIENT_NOTE,
        payload: {fId, id}
    }
}

export const getAvailabilitySchedule = (id) => {
    return {
        type: GET_AVAILABILITY_SCHEDULE,
        payload: {id}
    }
}

export const editAvailabilitySchedule = ( id, body) => {

    return {
        type: EDIT_AVAILABILITY_SCHEDULE,
        payload: { body, id,}
    }
}

export const createAvailabilitySchedule = ( id, onModel, body) => {

    return {
        type: CREATE_AVAILABILITY_SCHEDULE,
        payload: {onModel, body, id,}
    }
}

export const deleteAvailabilitySchedule = ( id) => {

    return {
        type: DELETE_AVAILABILITY_SCHEDULE,
        payload: { id,}
    }
}
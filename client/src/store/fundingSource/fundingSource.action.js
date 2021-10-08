import {
    CREATE_FUNDING_SOURCE,
    GET_FUNDING_SOURCE,
    GET_FUNDING_SOURCE_BY_ID,
    GET_FUNDING_SOURCE_SERVICE_BY_ID,
    CREATE_FUNDING_SOURCE_SERVICE_BY_ID,
    GET_FUNDING_SOURCE_HISTORIES_BY_ID,
    GET_FUNDING_SOURCE_SERV,
    CREATE_FUNDING_SOURCE_SERV,
    GET_FUNDING_SOURCE_SERV_BY_ID,
    EDIT_FUNDING_SOURCE,
    EDIT_FUNDING_SOURCE_SERVICE,
    CREATE_FUNDING_SOURCE_SERVICE_MODIFIER,
    GET_ACTIVE_OR_INACTIVE,
    DELETE_FUNDING_SOURCE_SERVICE,
    GET_FUNDING_SOURCE_NOTES,
    CREATE_FUNDING_SOURCE_NOTE,
    EDIT_FUNDING_SOURCE_NOTE,
    DELETE_FUNDING_SOURCE_NOTE,
    GET_FUNDING_SOURCE_SERVICE_MODIFIERS,
    EDIT_ACTIVE_OR_INACTIVE,
    EDIT_FUNDING_SOURCE_SERVICE_MODIFIER,
    GET_FUNDING_SOURCE_SERVICE_MODIFIERS_CLIENT,
} from "./fundingSource.types";

export const createFundingSource = (body) => {
    return {
        type: CREATE_FUNDING_SOURCE,
        payload: {body}
    }
}

export const editFundingSource = (id, body) => {
    return {
        type: EDIT_FUNDING_SOURCE,
        payload: {id, body}
    }
}


export const getFundingSource = (data) => {
    return {
        type: GET_FUNDING_SOURCE,
        payload: {data}
    }
}

export const getFundingSourceById = (id) => {
    return {
        type: GET_FUNDING_SOURCE_BY_ID,
        payload: id
    }
}



export const getFoundingSourceServiceById = (id) => {
    return {
        type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
        payload: id
    }
}
export const createFoundingSourceServiceById = (id, body, modifier) => {
    return {
        type: CREATE_FUNDING_SOURCE_SERVICE_BY_ID,
        payload: {
            id,
            body,
            modifier
        }
    }
}

export const editFoundingSourceServiceById = (id, body, modifier, fsId) => {
    return {
        type: EDIT_FUNDING_SOURCE_SERVICE,
        payload: {
            id,
            body,
            modifier,
            fsId
        }
    }
}

export const deleteFoundingSourceServiceById = (id) => {
    return {
        type: DELETE_FUNDING_SOURCE_SERVICE,
        payload: {id}
    }
}


export const createFoundingSourceServiceModifier = (body) => {
    return {
        type: 'CREATE_FUNDING_SOURCE_SERVICE_MODIFIER',
        payload: {
            body
        }
    }
}


export const getFoundingSourceServiceModifiers = (id) => {

    return {
        type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS,
        payload: id
    }
}


export const getFoundingSourceServiceModifiersForClient = (id) => {

    return {
        type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_CLIENT,
        payload: id
    }
}

export const getFundingSourceHistoriesById = (id, onModal) => {
    return {
        type: GET_FUNDING_SOURCE_HISTORIES_BY_ID,
        payload: {id, onModal}
    }
}



export const editFoundingSourceModifier = (id, body,fId) => {

    return {
        type: EDIT_FUNDING_SOURCE_SERVICE_MODIFIER,
        payload: {
            id,
            body,
            fId
        }
    }
}



export const getFundingSourceServ = () => {

    return {
        type: GET_FUNDING_SOURCE_SERV,
    }
}

export const getFundingSourceServById = (id) => {
    return {
        type: GET_FUNDING_SOURCE_SERV_BY_ID,
        payload: id
    }
}


export const createFundingSourceServ = (body) => {
    return {
        type: CREATE_FUNDING_SOURCE_SERV,
        payload: {body}
    }
}


export const getActiveOrInactive = (type) => {
    return {
        type: GET_ACTIVE_OR_INACTIVE,
        payload: {type}
    }
}

export const editActiveOrInactive = (id, path, status, body, type) => {
    return {
        type: EDIT_ACTIVE_OR_INACTIVE,
        payload: {id, path, status, body, type}
    }
}



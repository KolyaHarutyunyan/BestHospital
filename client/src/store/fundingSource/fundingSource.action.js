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
} from "./fundingSource.types";

export const createFundingSource = (body) => {
    return {
        type: CREATE_FUNDING_SOURCE,
        payload: {body}
    }
}

export const editFundingSource = (id,body) => {
    return {
        type: EDIT_FUNDING_SOURCE,
        payload: {id,body}
    }
}


export const getFundingSource = (status) => {
    return {
        type: GET_FUNDING_SOURCE,
        payload : {status}
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
export const createFoundingSourceServiceById = (id, body) => {
    return {
        type: CREATE_FUNDING_SOURCE_SERVICE_BY_ID,
        payload: {
            id ,
            body
        }
    }
}

export const editFoundingSourceServiceById = (id, body) => {
    return {
        type: EDIT_FUNDING_SOURCE_SERVICE,
        payload: {
            id ,

        }
    }
}

export const deleteFoundingSourceServiceById = (id, body) => {
    return {
        type: DELETE_FUNDING_SOURCE_SERVICE,
        payload: {id }
    }
}

export const createFoundingSourceServiceModifier = (id, body) => {
    return {
        type: CREATE_FUNDING_SOURCE_SERVICE_MODIFIER,
        payload: {
            id ,
            body
        }
    }
}
export const getFundingSourceHistoriesById = (id,onModal) => {
    return {
        type: GET_FUNDING_SOURCE_HISTORIES_BY_ID,
        payload: {id,onModal}
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
        payload : id
    }
}


export const createFundingSourceServ = (body) => {
    return {
        type: CREATE_FUNDING_SOURCE_SERV,
        payload : {body}
    }
}

export const getActiveOrInactive = (type) =>{
    return{
        type:  GET_ACTIVE_OR_INACTIVE,
        payload : {type}
    }
}


export const getFundingSourceNotes = (id,onModal) => {
    return {
        type: GET_FUNDING_SOURCE_NOTES,
        payload: {id,onModal}
    }
}


export const createFoundingSourceNote = ( body) => {

    return {
        type: CREATE_FUNDING_SOURCE_NOTE,
        payload: {
            body
        }
    }
}

export const editFoundingSourceNote = (id, body) => {

    return {
        type: EDIT_FUNDING_SOURCE_NOTE,
        payload: {
            body,
            id
        }
    }
}

export const deleteFoundingSourceNote = (id) => {

    return {
        type: DELETE_FUNDING_SOURCE_NOTE,
        payload: {

            id
        }
    }
}
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
} from "./fundingSource.types";

export const createFundingSource = (body) => {
    return {
        type: CREATE_FUNDING_SOURCE,
        payload: {body}
    }
}

export const getFundingSource = () => {
    return {
        type: GET_FUNDING_SOURCE
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
export const getFundingSourceHistoriesById = (id) => {
    return {
        type: GET_FUNDING_SOURCE_HISTORIES_BY_ID,
        payload: id
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
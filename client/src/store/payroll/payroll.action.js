import {
    CREATE_PAYCODE_GLOBAL,
    GET_PAYCODE_GLOBAL,
    EDIT_PAYCODE_BY_ID_GLOBAL,
    DELETE_PAYCODE_BY_ID_GLOBAL,
} from "./payroll.type";

export const createPayCodeGlobal = (body) => {
    return {
        type: CREATE_PAYCODE_GLOBAL,
        payload: {body}
    }
}

export const getPayCodeGlobal = () => {
    return {
        type: GET_PAYCODE_GLOBAL,
    }
}

export const editPayCodeByIdGlobal = (body, id) => {
    return {
        type: EDIT_PAYCODE_BY_ID_GLOBAL,
        payload: {body, id}
    }
}

export const deletePayCodeByIdGlobal = (id) => {
    return {
        type: DELETE_PAYCODE_BY_ID_GLOBAL,
        payload: {id}
    }
}
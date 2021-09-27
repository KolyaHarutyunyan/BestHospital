import {
    CREATE_PAYCODE_GLOBAL,
    GET_PAYCODE_GLOBAL,
    EDIT_PAYCODE_BY_ID_GLOBAL,
    DELETE_PAYCODE_BY_ID_GLOBAL,
    CREATE_OVERTIME_SETTINGS_GLOBAL,
    GET_OVERTIME_SETTINGS_GLOBAL,
    EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL,
    DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL,
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


export const createOvertimeSettingsGlobal = (body) => {
    return {
        type: CREATE_OVERTIME_SETTINGS_GLOBAL,
        payload: {body}
    }
}

export const getOvertimeSettingsGlobal = () => {
    return {
        type: GET_OVERTIME_SETTINGS_GLOBAL,
    }
}

export const editOvertimeSettingsByIdGlobal = (body, id) => {
    return {
        type: EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL,
        payload: {body, id}
    }
}

export const deleteOvertimeSettingsByIdGlobal = (id) => {
    return {
        type: DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL,
        payload: {id}
    }
}
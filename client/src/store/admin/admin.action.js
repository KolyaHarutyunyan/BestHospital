import {
    CREATE_ADMIN,
    EDIT_ADMIN_BY_ID,
    GET_ADMIN_BY_ID,
    GET_ADMINS,
    CREATE_CREDENTIAL,
    GET_CREDENTIAL,
    EDIT_CREDENTIAL_BY_ID,
    DELETE_CREDENTIAL_BY_ID,
    GET_EMPLOYMENT,
    CREATE_EMPLOYMENT,
    GET_PAY_CODE,
    CREATE_PAY_CODE,
    EDIT_EMPLOYMENT,
    CREATE_STAFF_SERVICE,
    GET_STAFF_SERVICE,
    DELETE_STAFF_SERVICE,
    GET_TIMESHEET,
    CREATE_TIMESHEET,
    GET_ALL_PAYCODES, EDIT_TIMESHEET

} from "./admin.types";

export const createAdmin = (body) => {
    return {
        type: CREATE_ADMIN,
        payload: {body}
    }
}

export const editAdminById = (body, id) => {
    return {
        type: EDIT_ADMIN_BY_ID,
        payload: {body, id}
    }
}

export const getAdmins = (data) => {
    return {
        type: GET_ADMINS,
        payload: {data}
    }
}

export const getAdminById = (adminId) => {
    return {
        type: GET_ADMIN_BY_ID,
        payload: {adminId}
    }
}

export const createCredential = (body) => {
    return {
        type: CREATE_CREDENTIAL,
        payload: {body}
    }
}

export const getCredential = (credentialId) => {
    return {
        type: GET_CREDENTIAL,
        payload: {credentialId}
    }
}

export const editCredentialById = (body, id, credentialId) => {
    return {
        type: EDIT_CREDENTIAL_BY_ID,
        payload: {body, id,credentialId}
    }
}
export const deleteCredentialById = (id,credentialId) => {
    return {
        type: DELETE_CREDENTIAL_BY_ID,
        payload: {id,credentialId}
    }
}

export const getEmployment = (id) => {
    return {
        type: GET_EMPLOYMENT,
        payload: {id}
    }
}

export const createEmployment = (body,id) => {
    return {
        type: CREATE_EMPLOYMENT,
        payload: {body, id}
    }
}


export const editEmployment = (body,id,staffId) => {
    return {
        type: EDIT_EMPLOYMENT ,
        payload: {body, id, staffId}
    }
}


export const getPayCode = (id) => {
    return {
        type: GET_PAY_CODE,
        payload: {id}
    }
}

export const createPayCode = (body,id) => {
    return {
        type: CREATE_PAY_CODE,
        payload: {body,id}
    }
}

export const getStaffService = (id) => {
    return {
        type: GET_STAFF_SERVICE,
        payload: {id}
    }
}


export const createStaffService = (id,serviceId) => {
    return {
        type: CREATE_STAFF_SERVICE,
        payload: {id, serviceId}
    }
}

export const deleteStaffService = (id,serviceId) => {
    return {
        type: DELETE_STAFF_SERVICE,
        payload: {id, serviceId}
    }
}



export const isClinician = (id) => {
    return {
        type: IS_CLINICIAN,
    }
}
export const getTimesheet = (id) => {
    return {
        type: GET_TIMESHEET,
        payload: {id}
    }
}

export const createTimesheet = (body,id) => {
    return {
        type: CREATE_TIMESHEET,
        payload: { body,id}
    }
}

export const editTimesheet = (body,id) => {
    return {
        type: EDIT_TIMESHEET,
        payload: { body,id}
    }
}


export const getAllPaycodes = (id) => {
    return {
        type: GET_ALL_PAYCODES,
        payload: {id}
    }
}
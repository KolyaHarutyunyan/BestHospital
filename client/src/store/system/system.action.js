import {
    CREATE_CREDENTIAL_GLOBAL,
    GET_CREDENTIAL_GLOBAL,
    EDIT_CREDENTIAL_BY_ID_GLOBAL,
    CREATE_SERVICE_GLOBAL,
    GET_SERVICES,
    EDIT_SERVICE_BY_ID_GLOBAL,
    DELETE_SERVICE_BY_ID_GLOBAL,
    DELETE_CREDENTIAL_BY_ID_GLOBAL,
    GET_DEPARTMENTS,
    CREATE_DEPARTMENT_GLOBAL,
    EDIT_DEPARTMENT_BY_ID_GLOBAL,
    DELETE_DEPARTMENT_BY_ID_GLOBAL,
    CREATE_JOB_GLOBAL,
    GET_JOBS,
    EDIT_JOB_BY_ID_GLOBAL,
    DELETE_JOB_BY_ID_GLOBAL,
} from "./system.type";

// credential

export const createCredentialGlobal = (body) => {
    return {
        type: CREATE_CREDENTIAL_GLOBAL,
        payload: {body}
    }
}

export const getCredentialGlobal = () => {
    return {
        type: GET_CREDENTIAL_GLOBAL,
    }
}

export const editCredentialByIdGlobal = (body, id) => {

    return {
        type: EDIT_CREDENTIAL_BY_ID_GLOBAL,
        payload: {body, id}
    }
}

export const deleteCredentialByIdGlobal = (id) => {
    return {
        type: DELETE_CREDENTIAL_BY_ID_GLOBAL,
        payload: {id}
    }
}

// credential

// service

export const createServiceGlobal = (body) => {
    return {
        type: CREATE_SERVICE_GLOBAL,
        payload: {body}
    }
}

export const getServices = () => {
    return {
        type: GET_SERVICES,
    }
}

export const editServiceByIdGlobal = (body, id) => {
    return {
        type: EDIT_SERVICE_BY_ID_GLOBAL,
        payload: {body, id}
    }
}

export const deleteServiceByIdGlobal = (id) => {
    return {
        type: DELETE_SERVICE_BY_ID_GLOBAL,
        payload: {id}
    }
}

// service


// departments

export const createDepartmentGlobal = (body) => {
    return {
        type: CREATE_DEPARTMENT_GLOBAL,
        payload: {body}
    }
}

export const getDepartments = () => {
    return {
        type: GET_DEPARTMENTS,
    }
}

export const editDepartmentByIdGlobal = (body, id) => {
    return {
        type: EDIT_DEPARTMENT_BY_ID_GLOBAL,
        payload: {body, id}
    }
}

export const deleteDepartmentByIdGlobal = (id) => {
    return {
        type: DELETE_DEPARTMENT_BY_ID_GLOBAL,
        payload: {id}
    }
}

// departments

// jobs

export const createJobGlobal = (body) => {
    return {
        type: CREATE_JOB_GLOBAL,
        payload: {body}
    }
}

export const getJobs = () => {
    return {
        type: GET_JOBS,
    }
}

export const editJobByIdGlobal = (body, id) => {
    return {
        type: EDIT_JOB_BY_ID_GLOBAL,
        payload: {body, id}
    }
}

export const deleteJobByIdGlobal = (id) => {
    return {
        type: DELETE_JOB_BY_ID_GLOBAL,
        payload: {id}
    }
}

// jobs
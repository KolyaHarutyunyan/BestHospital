import {
    CREATE_CREDENTIAL_GLOBAL_SUCCESS,
    CREATE_DEPARTMENT_GLOBAL_SUCCESS,
    CREATE_JOB_GLOBAL_SUCCESS,
    CREATE_PLACE_GLOBAL_SUCCESS,
    CREATE_SERVICE_GLOBAL_SUCCESS,
    DELETE_CREDENTIAL_BY_ID_GLOBAL_SUCCESS,
    DELETE_DEPARTMENT_BY_ID_GLOBAL_SUCCESS,
    DELETE_JOB_BY_ID_GLOBAL_SUCCESS, DELETE_PLACE_BY_ID_GLOBAL_SUCCESS,
    DELETE_SERVICE_BY_ID_GLOBAL_SUCCESS,
    EDIT_CREDENTIAL_BY_ID_GLOBAL_SUCCESS,
    EDIT_DEPARTMENT_BY_ID_GLOBAL_SUCCESS,
    EDIT_JOB_BY_ID_GLOBAL_SUCCESS, EDIT_PLACE_BY_ID_GLOBAL_SUCCESS,
    EDIT_SERVICE_BY_ID_GLOBAL_SUCCESS,
    GET_CREDENTIAL_GLOBAL_SUCCESS,
    GET_DEPARTMENTS_SUCCESS,
    GET_JOBS_SUCCESS, GET_PLACES_SUCCESS,
    GET_SERVICES_SUCCESS
} from "./system.type";

const initialState = {
    credentials: [],
    credentialById: [],
    services: [],
    servicesById: [],
    departments: [],
    departmentsById: [],
    jobs: [],
    jobsId: [],
    places: [],
    placesById: [],
};

export const systemReducer = (state = initialState, action) => {

    switch (action.type) {
        /** Credential */
        case CREATE_CREDENTIAL_GLOBAL_SUCCESS :
            return {
                ...state,
                credentialById: action.payload
            }
        case GET_CREDENTIAL_GLOBAL_SUCCESS :
            return {
                ...state,
                credentials: action.payload
            }
        case EDIT_CREDENTIAL_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                credentialById: action.payload
            }
        case DELETE_CREDENTIAL_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                servicesById: {}
            }
        /** End */

        /** Service */
        case CREATE_SERVICE_GLOBAL_SUCCESS :
            return {
                ...state,
                servicesById: action.payload
            }
        case GET_SERVICES_SUCCESS :
            return {
                ...state,
                services: action.payload
            }
        case EDIT_SERVICE_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                servicesById: action.payload
            }
        case DELETE_SERVICE_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                servicesById: {}
            }
        /** End */

        /** Department */
        case CREATE_DEPARTMENT_GLOBAL_SUCCESS :
            return {
                ...state,
                departmentsById: action.payload
            }
        case GET_DEPARTMENTS_SUCCESS :
            return {
                ...state,
                departments: action.payload
            }
        case EDIT_DEPARTMENT_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                departmentsById: action.payload
            }
        case DELETE_DEPARTMENT_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                departmentsById: {}
            }
        /** End */

        /** Job */
        case CREATE_JOB_GLOBAL_SUCCESS :
            return {
                ...state,
                jobsById: action.payload
            }
        case GET_JOBS_SUCCESS :
            return {
                ...state,
                jobs: action.payload
            }
        case EDIT_JOB_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                jobsById: action.payload
            }
        case DELETE_JOB_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                jobsById: {}
            }
        /** End */

        /** Place */
        case GET_PLACES_SUCCESS :
            return {
                ...state,
                places: action.payload
            }
        /** End */

        default:
            return state;
    }
};
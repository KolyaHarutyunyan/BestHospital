import {
    EDIT_ADMIN_BY_ID_SUCCESS,
    GET_ADMIN_BY_ID,
    GET_ADMIN_BY_ID_SUCCESS,
    GET_ADMINS_SUCCESS,
    CREATE_CREDENTIAL_SUCCESS,
    GET_CREDENTIAL_SUCCESS,
    EDIT_CREDENTIAL_BY_ID_SUCCESS,
    DELETE_CREDENTIAL_BY_ID_SUCCESS,
    CREATE_ADMIN_SUCCESS,
    GET_EMPLOYMENT_SUCCESS,
    GET_PAY_CODE_SUCCESS,
    GET_STAFF_SERVICE_SUCCESS, GET_ALL_PAYCODES_SUCCESS, GET_TIMESHEET_SUCCESS, GET_ALL_ADMINS_SUCCESS
} from "./admin.types";

const initialState = {
    adminsList: [],
    adminsAllList: [],
    adminsListReserve: [],
    adminInfoById: '',
    credential: [],
    employments : [],
    payCodes : [],
    staffServices : [],
    allPaycodes : [],
    timesheet : [],
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ADMIN_SUCCESS:
            return {
                ...state,
                adminsList: [...state.adminsList.staff ,action.payload ]
            }
        case GET_ADMINS_SUCCESS:
            return {
                ...state,
                adminsList: action.payload,
                adminsListReserve: action.payload,
                adminInfoById: '',
                credential: [],
                employments: [],
                payCodes:  []
            }
        case GET_ALL_ADMINS_SUCCESS:
            return {
                ...state,
                adminsAllList : action.payload
            }


        case EDIT_ADMIN_BY_ID_SUCCESS:
            return {
                ...state,
                adminInfoById: action.payload,
            }
        case  GET_ADMIN_BY_ID_SUCCESS:
            return {
                ...state,
                adminInfoById: action.payload
            }
        case GET_ADMIN_BY_ID :
            return {
                ...state,
                adminInfoById: action.payload.adminId
            }

        case CREATE_CREDENTIAL_SUCCESS :
            return {
                ...state,
                credential: [action.payload, ...state.credential]
            }

        case GET_CREDENTIAL_SUCCESS :
            return {
                ...state,
                credential: action.payload
            }
        case EDIT_CREDENTIAL_BY_ID_SUCCESS :
            return {
                ...state,
                credentialById: action.payload
            }

        case DELETE_CREDENTIAL_BY_ID_SUCCESS :
            return {
                ...state,
                credentialById: ''
            }
        case GET_EMPLOYMENT_SUCCESS :
            return {
                ...state,
                employments: action.payload.reverse()
            }
        case GET_PAY_CODE_SUCCESS :
            return {
                ...state,
                payCodes: action.payload.reverse()
            }
            case GET_STAFF_SERVICE_SUCCESS :
            return {
                ...state,
                staffServices: action.payload
            }
            case GET_ALL_PAYCODES_SUCCESS :
            return {
                ...state,
                allPaycodes: action.payload
            }
        case GET_TIMESHEET_SUCCESS :
            return {
                ...state,
                timesheet: action.payload
            }
        default:
            return state;
    }
};

import {
    CREATE_OVERTIME_SETTINGS_GLOBAL_SUCCESS,
    CREATE_PAYCODE_GLOBAL_SUCCESS,
    DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL_SUCCESS,
    DELETE_PAYCODE_BY_ID_GLOBAL_SUCCESS,
    EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL_SUCCESS,
    EDIT_PAYCODE_BY_ID_GLOBAL_SUCCESS,
    GET_OVERTIME_SETTINGS_GLOBAL_SUCCESS,
    GET_PAYCODE_GLOBAL_SUCCESS,
} from "./payroll.type";

const initialState = {
    PayCodes: [],
    payCodeById: [],
    overtimeSettings: [],
    overtimeSettingsById: [],
};

export const payrollReducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_PAYCODE_GLOBAL_SUCCESS :
            return {
                ...state,
                payCodeById: action.payload
            }

        case GET_PAYCODE_GLOBAL_SUCCESS :
            return {
                ...state,
                PayCodes: action.payload
            }
        case EDIT_PAYCODE_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                payCodeById: action.payload
            }
        case DELETE_PAYCODE_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                payCodeById: {}
            }

        case CREATE_OVERTIME_SETTINGS_GLOBAL_SUCCESS :
            return {
                ...state,
                overtimeSettingsById: action.payload
            }

        case GET_OVERTIME_SETTINGS_GLOBAL_SUCCESS :
            return {
                ...state,
                overtimeSettings: action.payload
            }
        case EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                overtimeSettingsById: action.payload
            }
        case DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL_SUCCESS :
            return {
                ...state,
                overtimeSettingsById: {}
            }

        default:
            return state;
    }
};
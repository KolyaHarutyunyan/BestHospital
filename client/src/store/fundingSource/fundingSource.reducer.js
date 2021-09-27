import {
    GET_FUNDING_SOURCE_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SUCCESS,
    GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SERV_SUCCESS,
    GET_FUNDING_SOURCE_SERV_BY_ID_SUCCESS,
    GET_ACTIVE_OR_INACTIVE,
    GET_FUNDING_SOURCE_NOTES_SUCCESS,
    CREATE_FUNDING_SOURCE_NOTES_SUCCESS,
    CREATE_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SERVICE_MODIFIERS_SUCCESS, GET_FUNDING_SOURCE_SERVICE_MODIFIERS_ERR
} from "./fundingSource.types";
import {paginate} from "@eachbase/utils";
import {activeInactive} from "@eachbase/utils";


const initialState = {
    fundingSourceList: [],
    fSelect : [],
    fundingSourceListReserve: [],
    fundingSourceItem: null,
    fundingSourceServices: [],
    fundingSourceHistories: [],
    fundingSourceNotes: [],
    services: null,
    servicesItem : [],
    modifiers : []
};

export const fundingSourceReducer = (state = initialState, action) => {
    switch (action.type) {

        case  GET_FUNDING_SOURCE_SUCCESS:
            return {
                ...state,
                fSelect : action.payload,
                fundingSourceList: action.payload,
                fundingSourceListReserve:action.payload,
                fundingSourceServices : [],
                fundingSourceHistories : [],
                fundingSourceNotes : []
            }

        case  GET_FUNDING_SOURCE_BY_ID_SUCCESS:
            return {
                ...state,
                fundingSourceItem: action.payload,
            }

        case  GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS:
            return {
                ...state,
                modifiers:  [],
                fundingSourceServices: action.payload.reverse()
            }
            case  CREATE_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS:
            return {
                ...state,
                fundingSourceServices: [action.payload,...state.fundingSourceServices, ]
            }

        case  GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS:
            return {
                ...state,
                fundingSourceHistories: action.payload
            }

        case  GET_FUNDING_SOURCE_SERV_SUCCESS:
            return {
                ...state,
                services: action.payload
            }
        case  GET_FUNDING_SOURCE_SERV_BY_ID_SUCCESS:
            return {
                ...state,
                servicesItem: action.payload
            }

        case  GET_FUNDING_SOURCE_NOTES_SUCCESS :
            return {
                ...state,
                fundingSourceNotes: action.payload.reverse()
            }

        case  CREATE_FUNDING_SOURCE_NOTES_SUCCESS:
            return {
                ...state,
                fundingSourceNotes: [action.payload,...state.fundingSourceNotes, ]
            }

        case GET_ACTIVE_OR_INACTIVE:
            return {
                ...state,
                fundingSourceList: paginate((activeInactive(state.fundingSourceListReserve, action.payload.type, 'founding')), 10),
            }
            case GET_FUNDING_SOURCE_SERVICE_MODIFIERS_SUCCESS:
            return {
                ...state,
                modifiers: action.payload,
            }
            case GET_FUNDING_SOURCE_SERVICE_MODIFIERS_ERR:
            return {
                ...state,
                modifiers: [],
            }
        default:
            return state;
    }
};

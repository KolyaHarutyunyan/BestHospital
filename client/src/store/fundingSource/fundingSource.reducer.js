import {
    GET_FUNDING_SOURCE_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SUCCESS,
    GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SERV_SUCCESS,
    GET_FUNDING_SOURCE_SERV_BY_ID_SUCCESS, GET_ACTIVE_OR_INACTIVE
} from "./fundingSource.types";
import {paginate} from "@eachbase/utils";
import {activeInactive} from "@eachbase/utils";


const initialState = {
    fundingSourceList: [],
    fSelect : [],
    fundingSourceListReserve: [],
    fundingSourceItem: null,
    fundingSourceServices: null,
    fundingSourceHistories: null,
    services: null,
    servicesItem : null
};

export const fundingSourceReducer = (state = initialState, action) => {
    switch (action.type) {

        case  GET_FUNDING_SOURCE_SUCCESS:
            return {
                ...state,
                fSelect : action.payload,
                fundingSourceList: paginate((activeInactive(action.payload, 1, 'founding')), 10),
                fundingSourceListReserve:action.payload,
            }

        case  GET_FUNDING_SOURCE_BY_ID_SUCCESS:
            return {
                ...state,
                fundingSourceItem: action.payload,
            }

        case  GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS:
            return {
                ...state,
                fundingSourceServices: action.payload
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

        case GET_ACTIVE_OR_INACTIVE:
            return {
                ...state,
                fundingSourceList: paginate((activeInactive(state.fundingSourceListReserve, action.payload.type, 'founding')), 10),
            }
        default:
            return state;
    }
};

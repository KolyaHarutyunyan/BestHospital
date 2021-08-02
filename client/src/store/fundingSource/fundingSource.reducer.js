import {
    GET_FUNDING_SOURCE_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SUCCESS,
    GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SERV_SUCCESS,
    GET_FUNDING_SOURCE_SERV_BY_ID_SUCCESS
} from "./fundingSource.types";
import {paginate} from "@eachbase/utils";


const initialState = {
    fundingSourceList: [],
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
                fundingSourceList: paginate((action.payload), 10),
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
        default:
            return state;
    }
};

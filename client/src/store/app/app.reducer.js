import { combineReducers } from 'redux';
import { authReducer } from "../auth";
import {adminReducer} from "../admin";
import {officeReducer} from "../offices";
import {permissionsReducer} from "../permissions";
import {roleReducer} from "../role";
import {fundingSourceReducer} from "../fundingSource";
import {clientReducer} from "../client";
import {agentReducer} from "../agents";
import {httpRequestsOnLoadReducer} from "../http_requests_on_load";
import {httpRequestsOnSuccessReducer} from "../http_requests_on_success";
import {httpRequestsOnErrorsReducer} from "../http_requests_on_errors";

const initialState = {
    isLoading: false,
    error: false,
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const appReducer = combineReducers({
    auth: authReducer,
    global: globalReducer,
    admins: adminReducer,
    offices: officeReducer,
    permissions: permissionsReducer,
    roles: roleReducer,
    fundingSource: fundingSourceReducer,
    agents: agentReducer,
    client: clientReducer,



    httpOnLoad: httpRequestsOnLoadReducer,
    httpOnSuccess: httpRequestsOnSuccessReducer,
    httpOnError: httpRequestsOnErrorsReducer,
});

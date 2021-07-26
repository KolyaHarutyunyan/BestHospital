import { combineReducers } from 'redux';
import { authReducer } from "../auth";
import {adminReducer} from "../admin";
import {officeReducer} from "../offices";
import {permissionsReducer} from "../permissions";
import {roleReducer} from "../role";
import {branchReducer} from "../branches";
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
    branches: branchReducer,
    agents: agentReducer,



    httpOnLoad: httpRequestsOnLoadReducer,
    httpOnSuccess: httpRequestsOnSuccessReducer,
    httpOnError: httpRequestsOnErrorsReducer,
});

import {call, put, takeLatest} from "redux-saga/effects";
import {systemService} from "./system.service";
import {
    GET_CREDENTIAL_SUCCESS,
    CREATE_CREDENTIAL_GLOBAL,
    GET_CREDENTIAL,
    EDIT_CREDENTIAL_BY_ID_GLOBAL,

    CREATE_SERVICE_GLOBAL,
    GET_SERVICES_SUCCESS,
    GET_SERVICES, EDIT_SERVICE_BY_ID_GLOBAL,
    DELETE_SERVICE_BY_ID_GLOBAL
} from "./system.type";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {httpRequestsOnSuccessActions} from "../http_requests_on_success";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";

function* createCredentialGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.createCredentialGlobalService, action.payload.body);
        yield put({
            type: GET_CREDENTIAL,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}

function* getCredential() {
    try {
        const res = yield call(systemService.getCredentialService);
        yield put({
            type: GET_CREDENTIAL_SUCCESS,
            payload: res.data.reverse(),
        });

    } catch (err) {
        console.log(err)
        yield put({
            type: GET_CREDENTIAL_SUCCESS,
            payload: '',
        });
    }
}

function* editCredentialById(action) {
    console.log(action,'action');
    try {
        yield call(systemService.editCredentialByIdGlobalService, action.payload.id, action.payload.body)
        yield put({
            type: GET_CREDENTIAL,
        });
    } catch (err) {
        console.log(err)
    }
}

function* createServiceGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.createServiceGlobalService, action.payload.body);
        yield put({
            type: GET_SERVICES,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

function* getServices() {
    try {
        const res = yield call(systemService.getServicesService);
        yield put({
            type: GET_SERVICES_SUCCESS,
            payload: res.data.reverse(),
        });

    } catch (err) {
        console.log(err)
        yield put({
            type: GET_SERVICES_SUCCESS,
            payload: '',
        });
    }
}

function* editServiceByIdGlobal(action) {
    try {
        yield call(systemService.editServiceByIdGlobalService, action.payload.id, action.payload.body)
        yield put({
            type: GET_SERVICES,
        });

    } catch (err) {
        console.log(err)
    }
}

function* deleteServiceByIdGlobal(action) {
    try {
        yield call(systemService.deleteServiceByIdService, action.payload.id)
        yield put({
            type: GET_SERVICES,
        });

    } catch (err) {
        console.log(err)
    }
}

export const watchSystem = function* watchSystemSaga() {
    yield takeLatest(CREATE_CREDENTIAL_GLOBAL, createCredentialGlobal)
    yield takeLatest(GET_CREDENTIAL, getCredential)
    yield takeLatest(EDIT_CREDENTIAL_BY_ID_GLOBAL, editCredentialById)

    yield takeLatest(CREATE_SERVICE_GLOBAL, createServiceGlobal)
    yield takeLatest(GET_SERVICES, getServices)
    yield takeLatest(EDIT_SERVICE_BY_ID_GLOBAL, editServiceByIdGlobal)
    yield takeLatest(DELETE_SERVICE_BY_ID_GLOBAL, deleteServiceByIdGlobal)

};
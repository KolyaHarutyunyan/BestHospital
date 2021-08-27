import {call, put, takeLatest} from "redux-saga/effects";
import {systemService} from "./system.service";
import {
    EDIT_CREDENTIAL_BY_ID_GLOBAL_SUCCESS,
    GET_CREDENTIAL_SUCCESS,
    CREATE_CREDENTIAL_GLOBAL,
    GET_CREDENTIAL,
    EDIT_CREDENTIAL_BY_ID_GLOBAL,

    CREATE_SERVICE_GLOBAL,
    GET_SERVICES_SUCCESS,
    DELETE_SERVICE_BY_ID_GLOBAL_SUCCESS,
    GET_SERVICES, EDIT_SERVICE_BY_ID_GLOBAL,
    DELETE_SERVICE_BY_ID_GLOBAL
} from "./system.type";

function* createCredentialGlobal(action) {
    try {
        yield call(systemService.createCredentialGlobalService, action.payload.body);

        yield put({
            type: GET_CREDENTIAL,
        });
    } catch (err) {
        console.log(err)
    }
}

function* getCredential() {
    try {
        const res = yield call(systemService.getCredentialService);
        yield put({
            type: GET_CREDENTIAL_SUCCESS,
            payload: res.data,
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
    try {
        const res = yield call(systemService.editCredentialByIdGlobalService, action.payload.id, action.payload.body)

        yield put({
            type: EDIT_CREDENTIAL_BY_ID_GLOBAL_SUCCESS,
            payload: res.data,
        });

    } catch (err) {
        console.log(err)
    }
}

function* createServiceGlobal(action) {
    try {
        yield call(systemService.createServiceGlobalService, action.payload.body);
        yield put({
            type: GET_SERVICES,
        });
    } catch (err) {
        console.log(err)
    }
}

function* getServices() {
    try {
        const res = yield call(systemService.getServicesService);
        yield put({
            type: GET_SERVICES_SUCCESS,
            payload: res.data,
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
    console.log(action,'action');
    try {
        // const res = yield call(systemService.editServiceByIdGlobalService, action.payload.id, action.payload.body)
        console.log(action,'res');
        // yield put({
        //     type: EDIT_SERVICE_BY_ID_GLOBAL_SUCCESS,
        //     payload: res.data,
        // });

    } catch (err) {
        console.log(err)
    }
}

function* deleteServiceByIdGlobal(action) {
    try {
        yield call(systemService.deleteServiceByIdService, action.payload.id)

        yield put({
            type: DELETE_SERVICE_BY_ID_GLOBAL_SUCCESS,
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
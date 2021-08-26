import {call, put, takeLatest} from "redux-saga/effects";
import {systemService} from "./system.service";
import {
    EDIT_CREDENTIAL_BY_ID_GLOBAL_SUCCESS,
    GET_CREDENTIAL_SUCCESS,
    CREATE_CREDENTIAL_GLOBAL,
    GET_CREDENTIAL,
    EDIT_CREDENTIAL_BY_ID_GLOBAL
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

export const watchSystem = function* watchSystemSaga() {
    yield takeLatest(CREATE_CREDENTIAL_GLOBAL, createCredentialGlobal)
    yield takeLatest(GET_CREDENTIAL, getCredential)
    yield takeLatest(EDIT_CREDENTIAL_BY_ID_GLOBAL, editCredentialById)
};
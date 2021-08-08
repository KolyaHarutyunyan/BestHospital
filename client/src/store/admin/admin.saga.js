import {call, put, takeLatest} from "redux-saga/effects";
import {authService} from "./admin.service";
import {
    CREATE_ADMIN,
    GET_ADMIN_BY_ID,
    GET_ADMIN_BY_ID_SUCCESS,
    GET_ADMINS,
    GET_ADMINS_SUCCESS,
    EDIT_ADMIN_BY_ID,
    EDIT_ADMIN_BY_ID_SUCCESS,
    CREATE_CREDENTIAL,
    CREATE_CREDENTIAL_SUCCESS,
    EDIT_CREDENTIAL_BY_ID_SUCCESS,
    GET_CREDENTIAL_BY_ID,
    GET_CREDENTIAL_BY_ID_SUCCESS,
    EDIT_CREDENTIAL_BY_ID,
    DELETE_CREDENTIAL_BY_ID,
    DELETE_CREDENTIAL_BY_ID_SUCCESS,

} from "./admin.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";

function* createAdmin(action) {
    try {
        const res = yield call(authService.createAdminService, action.payload.body);

        yield put({
            type: GET_ADMINS,
        });
    } catch (err) {
        console.log(err.response, 'response')
    }
}

function* getAdmins({action, type}) {
    yield put(httpRequestsOnErrorsActions.removeError(type));
    yield put(httpRequestsOnLoadActions.appendLoading(type));
    try {
        const res = yield call(authService.getAdminsService);
        yield put({
            type: GET_ADMINS_SUCCESS,
            payload: res.data.reverse(),
        });
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.removeError(type));

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.removeError(type));
        console.log(err)
    }
}

function* getAdminById(action) {
    try {
        const res = yield call(authService.getAdminByIdService, action.payload.adminId);
        yield put({
            type: GET_ADMIN_BY_ID_SUCCESS,
            payload: res.data,
        });

    } catch (err) {
        console.log(err)
    }
}

function* editAdminById(action) {
    try {
        const res = yield call(authService.editAdminByIdService, action.payload.id, action.payload.body);
        yield put({
            type: EDIT_ADMIN_BY_ID_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
    }
}

function* createCredential(action) {
    try {
        const res = yield call(authService.createCredentialService, action.payload.body);
        yield put({
            type: CREATE_CREDENTIAL_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
    }
}

function* getCredentialById(action) {
    try {
        const res = yield call(authService.getCredentialByIdService, action.payload.credentialId);

        yield put({
            type: GET_CREDENTIAL_BY_ID_SUCCESS,
            payload: res.data,
        });

    } catch (err) {
        console.log(err)
    }
}

function* editCredentialById(action) {
    try {
        const res = yield call(authService.editCredentialByIdService, action.payload.id, action.payload.body)

        yield put({
            type: EDIT_CREDENTIAL_BY_ID_SUCCESS,
            payload: res.data,
        });

    } catch (err) {
        console.log(err)
    }
}

function* deleteCredentialById(action) {
    try {
        const res = yield call(authService.deleteCredentialByIdService, action.payload.id.id)

        yield put({
            type: DELETE_CREDENTIAL_BY_ID_SUCCESS,
        });

    } catch (err) {
        console.log(err)
    }
}

export const watchAdmin = function* watchAdminSaga() {
    yield takeLatest(CREATE_ADMIN, createAdmin);
    yield takeLatest(GET_ADMINS, getAdmins);
    yield takeLatest(GET_ADMIN_BY_ID, getAdminById);
    yield takeLatest(EDIT_ADMIN_BY_ID, editAdminById)
    yield takeLatest(CREATE_CREDENTIAL, createCredential)
    yield takeLatest(GET_CREDENTIAL_BY_ID, getCredentialById)
    yield takeLatest(EDIT_CREDENTIAL_BY_ID, editCredentialById)
    yield takeLatest(DELETE_CREDENTIAL_BY_ID, deleteCredentialById)
};

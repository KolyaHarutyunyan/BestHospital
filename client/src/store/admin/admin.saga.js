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
    GET_CREDENTIAL,
    GET_CREDENTIAL_SUCCESS,
    EDIT_CREDENTIAL_BY_ID,
    DELETE_CREDENTIAL_BY_ID,
    GET_EMPLOYMENT,
    CREATE_EMPLOYMENT,
    GET_EMPLOYMENT_SUCCESS,
    GET_PAY_CODE_SUCCESS,
    GET_PAY_CODE, CREATE_PAY_CODE, EDIT_EMPLOYMENT,
    // CREATE_ADMIN_SUCCESS,

} from "./admin.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {httpRequestsOnSuccessActions} from "../http_requests_on_success";

function* createAdmin(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield call(authService.createAdminService, action.payload.body);
        yield put({
            type: GET_ADMINS,
            payload: {status: 1, start: 0, end: 10},
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));


    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
    }
}

function* getAdmins(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getAdminsService, action.payload);
        yield put({
            type: GET_ADMINS_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));
        console.log(err)
    }
}

function* getAdminById(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getAdminByIdService, action.payload.adminId);
        yield put({
            type: GET_ADMIN_BY_ID_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    }
}

function* editAdminById(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        const res = yield call(authService.editAdminByIdService, action.payload.id, action.payload.body);
        yield put({
            type: EDIT_ADMIN_BY_ID_SUCCESS,
            payload: res.data,
        });

        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));
    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
    }
}

function* createCredential(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.createCredentialService, action.payload.body);
        yield put({
            type: CREATE_CREDENTIAL_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}

function* getCredential(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getCredentialService, action.payload.credentialId);
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_CREDENTIAL_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}

function* editCredentialById(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(authService.editCredentialByIdService, action.payload.id, action.payload.body)
        yield put({
            type: GET_CREDENTIAL,
            payload: {credentialId: action.payload.credentialId}
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}

function* deleteCredentialById(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(authService.deleteCredentialByIdService, action.payload.id)
        yield put({
            type: GET_CREDENTIAL,
            payload: {credentialId: action.payload.credentialId}
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}


function* getEmployment(action) {

    try {
        const res = yield call(authService.getEmploymentService, action.payload.id)
        console.log(res, 'resesseseesesese employ')
        yield put({
            type: GET_EMPLOYMENT_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        console.log(err, ' errr employmeny')

    }
}

function* createEmployment(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.createEmploymentService, action.payload.body)
        yield put({
            type: GET_EMPLOYMENT,
            payload: {id : action.payload.id}
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        console.log(res, 'resesseseesesese employ')
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err, ' errr employmeny')

    }
}

function* editEmployment(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.editEmploymentService, action.payload.body, action.payload.id)
        yield put({
            type: GET_EMPLOYMENT,
            payload: {id : action.payload.staffId}
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        console.log(res, 'resesseseesesese employ')
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err, ' errr employmeny')

    }
}

function* getPayCode(action) {

    try {
        const res = yield call(authService.getPayCodeService, action.payload.id)
        console.log(res, 'res pay code')
        yield put({
            type: GET_PAY_CODE_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        console.log(err, ' errr employmeny')

    }
}


function* createPayCode(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.createPayCodeService, action.payload.body)
        console.log(res,'ressss')
        // yield put({
        //     type: GET_PAY_CODE,
        //     payload: {id : action.payload.id}
        // });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        console.log(res, 'resesseseesesese employ')
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err, ' errr create paycode')

    }
}

export const watchAdmin = function* watchAdminSaga() {
    yield takeLatest(CREATE_ADMIN, createAdmin);
    yield takeLatest(GET_ADMINS, getAdmins);
    yield takeLatest(GET_ADMIN_BY_ID, getAdminById);
    yield takeLatest(EDIT_ADMIN_BY_ID, editAdminById)
    yield takeLatest(CREATE_CREDENTIAL, createCredential)
    yield takeLatest(GET_CREDENTIAL, getCredential)
    yield takeLatest(EDIT_CREDENTIAL_BY_ID, editCredentialById)
    yield takeLatest(DELETE_CREDENTIAL_BY_ID, deleteCredentialById)
    yield takeLatest(GET_EMPLOYMENT, getEmployment)
    yield takeLatest(CREATE_EMPLOYMENT, createEmployment)
    yield takeLatest(EDIT_EMPLOYMENT, editEmployment)
    yield takeLatest(GET_PAY_CODE, getPayCode)
    yield takeLatest(CREATE_PAY_CODE, createPayCode)

};

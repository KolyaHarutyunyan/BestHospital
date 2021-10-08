import {call, put, takeLatest} from "redux-saga/effects";
import {systemService} from "./system.service";
import {
    GET_CREDENTIAL_GLOBAL_SUCCESS,
    CREATE_CREDENTIAL_GLOBAL,
    GET_CREDENTIAL_GLOBAL,
    EDIT_CREDENTIAL_BY_ID_GLOBAL,
    DELETE_CREDENTIAL_BY_ID_GLOBAL,

    CREATE_SERVICE_GLOBAL,
    GET_SERVICES_SUCCESS,
    GET_SERVICES,
    EDIT_SERVICE_BY_ID_GLOBAL,
    DELETE_SERVICE_BY_ID_GLOBAL,

    GET_DEPARTMENTS,
    GET_DEPARTMENTS_SUCCESS,
    CREATE_DEPARTMENT_GLOBAL,
    EDIT_DEPARTMENT_BY_ID_GLOBAL,
    DELETE_DEPARTMENT_BY_ID_GLOBAL,

    CREATE_JOB_GLOBAL,
    GET_JOBS,
    EDIT_JOB_BY_ID_GLOBAL,
    DELETE_JOB_BY_ID_GLOBAL, GET_JOBS_SUCCESS,
} from "./system.type";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {httpRequestsOnSuccessActions} from "../http_requests_on_success";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";

//CREDENTIALS

function* createCredentialGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.createCredentialGlobalService, action.payload.body);
        yield put({
            type: GET_CREDENTIAL_GLOBAL,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}

function* getCredentialGlobal() {
    try {
        const res = yield call(systemService.getCredentialGlobalService);
        yield put({
            type: GET_CREDENTIAL_GLOBAL_SUCCESS,
            payload: res.data.reverse(),
        });

    } catch (err) {
        console.log(err)
        yield put({
            type: GET_CREDENTIAL_GLOBAL_SUCCESS,
            payload: '',
        });
    }
}

function* editCredentialById(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.editCredentialByIdGlobalService, action.payload.id, action.payload.body)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_CREDENTIAL_GLOBAL,
        });
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

function* deleteCredentialByIdGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.deleteCredentialByIdService, action.payload.id)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_CREDENTIAL_GLOBAL,
        });

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

// SERVICES

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
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.editServiceByIdGlobalService, action.payload.id, action.payload.body)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_SERVICES,
        });

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

function* deleteServiceByIdGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.deleteServiceByIdService, action.payload.id)

        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));

        yield put({
            type: GET_SERVICES,
        });

    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}

// DEPARTMENTS

function* createDepartmentGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.createDepartmentGlobalService, action.payload.body);
        yield put({
            type: GET_DEPARTMENTS,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

function* getDepartments() {
    try {
        const res = yield call(systemService.getDepartmentsService);
        yield put({
            type: GET_DEPARTMENTS_SUCCESS,
            payload: res.data.reverse(),
        });

    } catch (err) {
        console.log(err)
        yield put({
            type: GET_DEPARTMENTS_SUCCESS,
            payload: '',
        });
    }
}

function* editDepartmentByIdGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.editDepartmentByIdGlobalService, action.payload.id, action.payload.body)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_DEPARTMENTS,
        });

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

function* deleteDepartmentByIdGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.deleteDepartmentByIdService, action.payload.id)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_DEPARTMENTS,
        });

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

// JOBS

function* createJobGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.createJobGlobalService, action.payload.body);
        yield put({
            type: GET_JOBS,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

function* getJobs() {
    try {
        const res = yield call(systemService.getJobsService);
        yield put({
            type: GET_JOBS_SUCCESS,
            payload: res.data.reverse(),
        });

    } catch (err) {
        console.log(err)
        yield put({
            type: GET_JOBS_SUCCESS,
            payload: '',
        });
    }
}

function* editJobByIdGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.editJobByIdGlobalService, action.payload.id, action.payload.body)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_JOBS,
        });

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

function* deleteJobByIdGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(systemService.deleteJobByIdService, action.payload.id)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_JOBS,
        });

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

export const watchSystem = function* watchSystemSaga() {
    yield takeLatest(CREATE_CREDENTIAL_GLOBAL, createCredentialGlobal)
    yield takeLatest(GET_CREDENTIAL_GLOBAL, getCredentialGlobal)
    yield takeLatest(EDIT_CREDENTIAL_BY_ID_GLOBAL, editCredentialById)
    yield takeLatest(DELETE_CREDENTIAL_BY_ID_GLOBAL, deleteCredentialByIdGlobal)

    yield takeLatest(CREATE_SERVICE_GLOBAL, createServiceGlobal)
    yield takeLatest(GET_SERVICES, getServices)
    yield takeLatest(EDIT_SERVICE_BY_ID_GLOBAL, editServiceByIdGlobal)
    yield takeLatest(DELETE_SERVICE_BY_ID_GLOBAL, deleteServiceByIdGlobal)

    yield takeLatest(CREATE_DEPARTMENT_GLOBAL, createDepartmentGlobal)
    yield takeLatest(GET_DEPARTMENTS, getDepartments)
    yield takeLatest(EDIT_DEPARTMENT_BY_ID_GLOBAL, editDepartmentByIdGlobal)
    yield takeLatest(DELETE_DEPARTMENT_BY_ID_GLOBAL, deleteDepartmentByIdGlobal)

    yield takeLatest(CREATE_JOB_GLOBAL, createJobGlobal)
    yield takeLatest(GET_JOBS, getJobs)
    yield takeLatest(EDIT_JOB_BY_ID_GLOBAL, editJobByIdGlobal)
    yield takeLatest(DELETE_JOB_BY_ID_GLOBAL, deleteJobByIdGlobal)
};
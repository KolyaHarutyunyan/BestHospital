import { call, put, takeLatest } from "redux-saga/effects";
import { payrollService} from './payroll.service';

import {
    GET_PAYCODE_GLOBAL_SUCCESS,
    CREATE_PAYCODE_GLOBAL,
    GET_PAYCODE_GLOBAL,
    EDIT_PAYCODE_BY_ID_GLOBAL,
    DELETE_PAYCODE_BY_ID_GLOBAL,

    GET_OVERTIME_SETTINGS_GLOBAL,
    GET_OVERTIME_SETTINGS_GLOBAL_SUCCESS,
    CREATE_OVERTIME_SETTINGS_GLOBAL,
    EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL, DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL,
} from "./payroll.type";

import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {httpRequestsOnSuccessActions} from "../http_requests_on_success";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";

function* createPayCodeGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(payrollService.createPayCodeGlobalService, action.payload.body);
        yield put({
            type: GET_PAYCODE_GLOBAL,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}

function* getPayCodeGlobal() {
    try {
        const res = yield call(payrollService.getPayCodeGlobalService);
        yield put({
            type: GET_PAYCODE_GLOBAL_SUCCESS,
            payload: res.data.reverse(),
        });

    } catch (err) {
        console.log(err)
    }
}

function* editPayCodeById(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(payrollService.editPayCodeByIdGlobalService, action.payload.id, action.payload.body)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_PAYCODE_GLOBAL,
        });
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}

function* deletePayCodeByIdGlobal(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(payrollService.deletePayCodeByIdService, action.payload.id)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_PAYCODE_GLOBAL,
        });

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
        console.log(err)
    }
}



function* createOvertimeSettingsGlobal(action) {
    try {
        yield call(payrollService.createOvertimeSettingsGlobalService, action.payload.body);
        yield put({
            type: GET_OVERTIME_SETTINGS_GLOBAL,
        });
    } catch (err) {
        console.log(err)
    }
}

function* getOvertimeSettingsGlobal() {
    try {
        const res = yield call(payrollService.getOvertimeSettingsGlobalService);
        yield put({
            type: GET_OVERTIME_SETTINGS_GLOBAL_SUCCESS,
            payload: res.data.reverse(),
        });

    } catch (err) {
        console.log(err)
    }
}

function* editOvertimeSettingsById(action) {
    try {
        yield call(payrollService.editOvertimeSettingsByIdGlobalService, action.payload.id, action.payload.body)
        yield put({
            type: GET_OVERTIME_SETTINGS_GLOBAL,
        });
    } catch (err) {
        console.log(err)
    }
}

function* deleteOvertimeSettingsByIdGlobal(action) {
    try {
        yield call(payrollService.deleteOvertimeSettingsByIdService, action.payload.id)
        yield put({
            type: GET_OVERTIME_SETTINGS_GLOBAL,
        });
    } catch (err) {
        console.log(err)
    }
}

export const watchPayroll = function* watchPayrollSaga() {
    yield takeLatest(CREATE_PAYCODE_GLOBAL, createPayCodeGlobal)
    yield takeLatest(GET_PAYCODE_GLOBAL, getPayCodeGlobal)
    yield takeLatest(EDIT_PAYCODE_BY_ID_GLOBAL, editPayCodeById)
    yield takeLatest(DELETE_PAYCODE_BY_ID_GLOBAL, deletePayCodeByIdGlobal)

    yield takeLatest(CREATE_OVERTIME_SETTINGS_GLOBAL, createOvertimeSettingsGlobal)
    yield takeLatest(GET_OVERTIME_SETTINGS_GLOBAL, getOvertimeSettingsGlobal)
    yield takeLatest(EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL, editOvertimeSettingsById)
    yield takeLatest(DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL, deleteOvertimeSettingsByIdGlobal)

};

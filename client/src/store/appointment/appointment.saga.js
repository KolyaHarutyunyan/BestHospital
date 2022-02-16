import {call, put, takeLatest} from "redux-saga/effects";
import {appointmentService} from "./appointment.service";
import {
    APPOINTMENT_REPEAT,
    CREATE_APPOINTMENT,
    DELETE_APPOINTMENT,
    EDIT_APPOINTMENT,
    GET_APPOINTMENT,
    GET_APPOINTMENT_BY_ID,
    GET_APPOINTMENT_BY_ID_SUCCESS,
    GET_APPOINTMENT_FILTERED,
    GET_APPOINTMENT_SUCCESS, SET_APPOINTMENT_STATUS, SET_APPOINTMENT_STATUS_SUCCESS,
} from "./appointment.type";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {httpRequestsOnSuccessActions} from "../http_requests_on_success";
import {getAppointment} from "./appointment.action";
import {appointmentActions} from "./index";


/** Create, Edit Appointment */
function* createAppointmentSaga(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(appointmentService.createAppointmentService, action.payload.body);
        
        yield put({ type: GET_APPOINTMENT });

        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));


        // const res = yield call(appointmentService.getAppointmentService, );
        // yield put({
        //     type: GET_APPOINTMENT_SUCCESS,
        //     payload: res.data,
        // });

    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}

function* editAppointmentSaga(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(appointmentService.editAppointmentService, action.payload.body, action.payload.id, );

        // const res = yield call(appointmentService.getAppointmentService, );
        //
        // yield put({
        //     type: GET_APPOINTMENT_SUCCESS,
        //     payload: res.data,
        // });

   yield put({ type: GET_APPOINTMENT });

        // appointmentActions.getAppointment()

        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}
/** end */

/** Get Appointment */
function* getAppointmentSaga(action) {
    if(action.payload === 'load'){
        yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    }
    try {
        const res = yield call(appointmentService.getAppointmentService);
        yield put({
            type: GET_APPOINTMENT_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    } catch (error) {
        yield put({
            type: GET_APPOINTMENT_SUCCESS,
            payload: [],
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    }
}

function* getAppointmentFilterSaga(action) {
    // yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(appointmentService.getAppointmentFilterService, action.payload);
        yield put({
            type: GET_APPOINTMENT_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    } catch (error) {
        yield put({
            type: GET_APPOINTMENT_SUCCESS,
            payload: [],
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    }
}

function* getAppointmentByIdSaga(action) {
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(appointmentService.getAppointmentByIdService, action.payload.id);
        yield put({
            type: GET_APPOINTMENT_BY_ID_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put({
        //     type: GET_GLOBAL_NOTES_SUCCESS,
        //     payload: [],
        // });
    }
}
/** end */


/** Delete Appointment */
function* deleteAppointmentSaga(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(appointmentService.deleteAppointmentService, action.payload.id);
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({type: GET_APPOINTMENT,});
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}
/** end */


/** Appointment Status */
function* setAppointmentStatusSaga(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
       yield call(appointmentService.setAppointmentStatusService, action.payload.id, action.payload.info);

        // const res = yield call(appointmentService.getAppointmentService);
        yield put({
            type: GET_APPOINTMENT,
            // payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));

        // yield put({ type: SET_APPOINTMENT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.appendError(action.type));
    }
}
/** end */


/** Appointment Repeat */
function* appointmentRepeatSaga(action) {

    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
       yield call(appointmentService.appointmentRepeatService, action.payload.id, action.payload.body);
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    }
}
/** end */

export const watchAppointments = function* watchAppointmentsSaga() {
        /** Create, Edit Appointment */
        yield takeLatest(CREATE_APPOINTMENT, createAppointmentSaga);
        yield takeLatest(EDIT_APPOINTMENT, editAppointmentSaga);
        /** end */

        /** Get Appointment */
        yield takeLatest(GET_APPOINTMENT, getAppointmentSaga);
        yield takeLatest(GET_APPOINTMENT_FILTERED, getAppointmentFilterSaga);
        yield takeLatest(GET_APPOINTMENT_BY_ID, getAppointmentByIdSaga);
        /** end */

        /** Delete Appointment */
        yield takeLatest(DELETE_APPOINTMENT, deleteAppointmentSaga);
        /** end */

        /** Appointment Status */
        yield takeLatest(SET_APPOINTMENT_STATUS, setAppointmentStatusSaga)
        /** end */

        /** Appointment Repeat */
        yield takeLatest(APPOINTMENT_REPEAT, appointmentRepeatSaga)
        /** end */
};

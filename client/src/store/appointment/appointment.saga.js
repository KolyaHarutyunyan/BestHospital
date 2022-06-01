import { call, put, takeLatest } from "redux-saga/effects";
import { appointmentService } from "./appointment.service";
import {
   APPEND_SIGNATURE_TO_APPMT,
   APPOINTMENT_REPEAT,
   CREATE_APPOINTMENT,
   DELETE_APPOINTMENT,
   EDIT_APPOINTMENT,
   GET_APPOINTMENT,
   GET_APPOINTMENT_BY_ID,
   GET_APPOINTMENT_BY_ID_SUCCESS,
   GET_APPOINTMENT_FILTERED,
   GET_APPOINTMENT_SUCCESS,
   SET_APPOINTMENT_STATUS,
} from "./appointment.type";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "../http_requests_on_success";

/** Create, Edit Appointment */
function* createAppointmentSaga(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(appointmentService.createAppointmentService, action.payload.body);
      yield put({ type: GET_APPOINTMENT });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editAppointmentSaga(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         appointmentService.editAppointmentService,
         action.payload.body,
         action.payload.id
      );
      yield put({
         type: GET_APPOINTMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}
/** end */

/** Get Appointment */
function* getAppointmentSaga(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(appointmentService.getAppointmentService);
      yield put({
         type: GET_APPOINTMENT_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put({
         type: GET_APPOINTMENT_SUCCESS,
         payload: [],
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getAppointmentFilterSaga(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         appointmentService.getAppointmentFilterService,
         action.payload
      );
      yield put({
         type: GET_APPOINTMENT_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put({
         type: GET_APPOINTMENT_SUCCESS,
         payload: [],
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getAppointmentByIdSaga(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         appointmentService.getAppointmentByIdService,
         action.payload.id
      );
      yield put({
         type: GET_APPOINTMENT_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
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
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(appointmentService.deleteAppointmentService, action.payload.id);
      yield put({ type: GET_APPOINTMENT });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}
/** end */

/** Appointment Status */
function* setAppointmentStatusSaga(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         appointmentService.setAppointmentStatusService,
         action.payload.id,
         action.payload.statusName,
         action.payload.reason
      );
      yield put({
         type: GET_APPOINTMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}
/** end */

/** Appointment Repeat */
function* appointmentRepeatSaga(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         appointmentService.appointmentRepeatService,
         action.payload.id,
         action.payload.body
      );
      yield put({ type: GET_APPOINTMENT });
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}
/** end */

function* appendSignatureToAppmt(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         appointmentService.appendSignatureToAppmtService,
         action.payload.id,
         action.payload.signature
      );
      yield put({
         type: GET_APPOINTMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

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
   yield takeLatest(SET_APPOINTMENT_STATUS, setAppointmentStatusSaga);
   /** end */

   /** Appointment Repeat */
   yield takeLatest(APPOINTMENT_REPEAT, appointmentRepeatSaga);
   /** end */

   yield takeLatest(APPEND_SIGNATURE_TO_APPMT, appendSignatureToAppmt);
};

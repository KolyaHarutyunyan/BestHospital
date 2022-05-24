import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./mileage.service";
import {
   CREATE_MILEAGE,
   DELETE_MILEAGE,
   EDIT_MILEAGE,
   GET_MILEAGES,
   GET_MILEAGES_SUCCESS,
} from "./milage.types";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "../http_requests_on_success";

/** Create, Edit Mileage */

function* createMileage({ payload, type }) {
   yield put(httpRequestsOnErrorsActions.removeError(type));
   yield put(httpRequestsOnLoadActions.appendLoading(type));
   try {
      yield call(authService.createMileageService, payload.body);
      yield put({
         type: GET_MILEAGES,
      });
      yield put(httpRequestsOnSuccessActions.appendSuccess(type));
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put(httpRequestsOnErrorsActions.removeError(type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put(httpRequestsOnErrorsActions.appendError(type, err?.data?.message));
   }
}

function* editMileage({ payload, type }) {
   yield put(httpRequestsOnErrorsActions.removeError(type));
   yield put(httpRequestsOnLoadActions.appendLoading(type));
   try {
      yield call(authService.editMileageService, payload.id, payload.body);
      yield put({
         type: GET_MILEAGES,
      });
      yield put(httpRequestsOnSuccessActions.appendSuccess(type));
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put(httpRequestsOnErrorsActions.removeError(type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put(httpRequestsOnErrorsActions.appendError(type, err?.data?.message));
   }
}

/** End */

/** Get Mileages */

function* getMileages({ type }) {
   yield put(httpRequestsOnErrorsActions.removeError(type));
   yield put(httpRequestsOnLoadActions.appendLoading(type));
   try {
      const res = yield call(authService.getMileagesService);
      yield put({
         type: GET_MILEAGES_SUCCESS,
         payload: res.data,
      });

      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put(httpRequestsOnErrorsActions.removeError(type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put(httpRequestsOnErrorsActions.appendError(type, err?.data?.message));
   }
}

/** End */

/** Delete Mileages */

function* deleteMileages(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      yield call(authService.deleteMileageService, action.payload.id);
      yield put({
         type: GET_MILEAGES,
      });
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

/** End */

export const watchMileage = function* watchMileageSaga() {
   /** Create, Edit Mileage */
   yield takeLatest(CREATE_MILEAGE, createMileage);
   yield takeLatest(EDIT_MILEAGE, editMileage);
   /** End */

   /** Get Mileages */
   yield takeLatest(GET_MILEAGES, getMileages);
   /** End */

   /** Delete Mileages */
   yield takeLatest(DELETE_MILEAGE, deleteMileages);
   /** End */
};

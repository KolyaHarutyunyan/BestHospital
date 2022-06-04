import { call, put, take, takeLatest } from "redux-saga/effects";
import { authService } from "./offices.service";
import {
   CREATE_OFFICE,
   GET_OFFICE_BY_ID,
   GET_OFFICE_BY_ID_SUCCESS,
   GET_OFFICES,
   GET_OFFICES_SUCCESS,
   EDIT_OFFICE,
   ACTIVATE_OFFICE,
   INACTIVATE_OFFICE,
} from "./offices.types";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "..";

function* createOffice(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.createOfficeService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      window.location.replace("/fundingSource");
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editOffice(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.editOfficeService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      window.location.replace("/fundingSource");
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getOffice({ type }) {
   yield put(httpRequestsOnErrorsActions.removeError(type));
   yield put(httpRequestsOnLoadActions.appendLoading(type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(type));
   try {
      const res = yield call(authService.getOfficesService);
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      // yield put(httpRequestsOnSuccessActions.appendSuccess(type));
      yield put({
         type: GET_OFFICES_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put(httpRequestsOnErrorsActions.appendError(type, err?.data?.message));
   }
}

function* getOfficeById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(authService.getOfficeByIdService, action.payload.id);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_OFFICE_BY_ID_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* activateOffice(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.activateOfficeService, action.payload.id);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* inactivateOffice(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.inactivateOfficeService, action.payload.id);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchOffice = function* watchOfficeSaga() {
   yield takeLatest(CREATE_OFFICE, createOffice);
   yield takeLatest(EDIT_OFFICE, editOffice);
   yield takeLatest(GET_OFFICES, getOffice);
   yield takeLatest(GET_OFFICE_BY_ID, getOfficeById);

   yield takeLatest(ACTIVATE_OFFICE, activateOffice);
   yield takeLatest(INACTIVATE_OFFICE, inactivateOffice);
};

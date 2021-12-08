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
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";

function* createOffice(action) {
  try {
    const res = yield call( authService.createOfficeService, action.payload.body );
    window.location.replace('/fundingSource')
  } catch (err) {

  }
}


function* editOffice(action) {
  try {
    const res = yield call( authService.editOfficeService, action.payload.body );
    window.location.replace('/fundingSource')
  } catch (err) {

  }
}

function* getOffice({ action,type }) {

  // yield put(httpRequestsOnErrorsActions.removeError(type));
  // yield put(httpRequestsOnLoadActions.appendLoading(type));
  try {
    const res = yield call( authService.getOfficesService );
    yield put({
      type: GET_OFFICES_SUCCESS,
      payload: res.data,
    });
    // yield put(httpRequestsOnLoadActions.removeLoading(type));
    // yield put(httpRequestsOnErrorsActions.removeError(type));

  } catch (err) {
    // yield put(httpRequestsOnLoadActions.removeLoading(type));
    // yield put(httpRequestsOnErrorsActions.removeError(type));

  }
}

function* getOfficeById(action) {
  try {
    const res = yield call( authService.getOfficeByIdService, action.payload.id );
    yield put({
      type: GET_OFFICE_BY_ID_SUCCESS,
      payload: res.data,
    });

  } catch (err) {

  }
}

function* activateOffice(action) {
  try {
    const res = yield call( authService.activateOfficeService, action.payload.id );
  } catch (err) {

  }
}

function* inactivateOffice(action) {
  try {
    const res = yield call( authService.inactivateOfficeService, action.payload.id );
  } catch (err) {

  }
}



export const watchOffice = function* watchOfficeSaga() {
  yield takeLatest( CREATE_OFFICE, createOffice );
  yield takeLatest( EDIT_OFFICE, editOffice );
  yield takeLatest( GET_OFFICES, getOffice );
  yield takeLatest( GET_OFFICE_BY_ID, getOfficeById );

  yield takeLatest( ACTIVATE_OFFICE, activateOffice)
  yield takeLatest( INACTIVATE_OFFICE, inactivateOffice)
};

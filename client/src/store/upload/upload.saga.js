import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./upload.service";
import {
  CREATE_UPLOAD, DELETE_UPLOADS, GET_UPLOADS, GET_UPLOADS_ERROR, GET_UPLOADS_SUCCESS,
} from "./upload.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {httpRequestsOnSuccessActions} from "../http_requests_on_success";

/** Create, Upload */

function* createUpload({payload,type}) {
  yield put(httpRequestsOnErrorsActions.removeError(type));
  yield put(httpRequestsOnLoadActions.appendLoading(type));
  try {
    yield put(httpRequestsOnLoadActions.appendLoading(type));
    const res = yield call( authService.assignUploadService, payload.body );

    const info ={
      "resource": payload.createInfo.resource,
      "type": payload.createInfo.type,
      "url": res.data.url,
      "mimetype":res.data.mimetype,
      "size": res.data.size,
      "name":res.data?.name
    }
    if(res.data) {
      const created = yield call(authService.createUploadService, info);
      yield put({
        type: GET_UPLOADS,
        payload: { resource: payload.createInfo.resource}
      });
    }
    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnSuccessActions.appendSuccess(type));
  } catch (err) {
    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnErrorsActions.appendError(type));
  }
}

/** End */

/** Get Uploads */

function* getUploads({payload, type }) {
  yield put(httpRequestsOnErrorsActions.removeError(type));
  yield put(httpRequestsOnLoadActions.appendLoading(type));
  try {
    const res = yield call( authService.getUploadsService, payload.resource  );

    yield put({
      type: GET_UPLOADS_SUCCESS,
      payload: res.data,
    });
    yield put(httpRequestsOnLoadActions.removeLoading(type));
  } catch (err) {
    yield put({
      type: GET_UPLOADS_ERROR,
    });
    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnErrorsActions.appendError(type));
  }
}

/** End */

/** Get Uploads */

function* delUploads({payload, type }) {
  yield put(httpRequestsOnErrorsActions.removeError(type));
  yield put(httpRequestsOnLoadActions.appendLoading(type));
  try {
    yield call( authService.deleteUploadsService, payload.id, );
    yield put({
      type: GET_UPLOADS,
      payload: {resource:payload.authenticationsId},
    });
    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnSuccessActions.appendSuccess(type));
  } catch (err) {
    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnErrorsActions.appendError(type));
  }
}

/** End */

export const watchUpload = function* watchUploadSaga() {

  /** Create, Upload */
  yield takeLatest( CREATE_UPLOAD, createUpload );
  /** End */

  /** Get Mcs */
  yield takeLatest( GET_UPLOADS, getUploads );
  /** End */

  /** Get Mcs */
  yield takeLatest( DELETE_UPLOADS, delUploads );
  /** End */



};

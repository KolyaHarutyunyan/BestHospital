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
  yield put(httpRequestsOnSuccessActions.removeSuccess(type));

  try {
    const res = yield call( authService.assignUploadService, payload.body );
    const info ={
      "resource": payload.createInfo.resource,
      "type": payload.createInfo.type,
      "url": res.data.url,
      "mimetype":res.data.mimetype
    }
    if(res.data) {
      const created = yield call(authService.createUploadService, info);
      yield put({
        type: GET_UPLOADS,
        payload: { resource: payload.createInfo.resource, onModel: payload.createInfo.onModel,}
      });
      yield put(httpRequestsOnSuccessActions.appendSuccess(type));
    }
    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnErrorsActions.removeError(type));
  } catch (err) {
    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnErrorsActions.appendError(type));
  }
}

/** End */

/** Get Uploads */

function* getUploads({payload, type }) {
  yield put(httpRequestsOnErrorsActions.removeError(type));
  yield put(httpRequestsOnSuccessActions.removeSuccess(type));
  yield put(httpRequestsOnLoadActions.removeLoading(type));
  try {
    const res = yield call( authService.getUploadsService, payload.resource  );
    console.log(res,'res upload res');
    yield put({
      type: GET_UPLOADS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: GET_UPLOADS_ERROR,
    });
    console.log(err,'error error uploads');
  }
}

/** End */

/** Get Uploads */

function* delUploads({payload, type }) {
  yield put(httpRequestsOnErrorsActions.removeError(type));
  yield put(httpRequestsOnSuccessActions.removeSuccess(type));
  yield put(httpRequestsOnErrorsActions.removeError(type));
  try {
    const res = yield call( authService.deleteUploadsService, payload.id, );
    yield put(httpRequestsOnSuccessActions.appendSuccess(type));
    yield put({
      type: GET_UPLOADS,
      payload: {onModel: 'office', resource:payload.officeId},
    });
  } catch (err) {
    // yield put({
    //   type: GET_UPLOADS_ERROR,
    // });
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

import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./permissions.service";
import {
   CREATE_PERMISSION,
   DELETE_PERMISSION,
   GET_PERMISSIONS,
   GET_PERMISSIONS_SUCCESS,
} from "./permissions.types";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "..";

function* createPermission(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.createPermissionService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getPermissions({ type }) {
   yield put(httpRequestsOnErrorsActions.removeError(type));
   yield put(httpRequestsOnLoadActions.appendLoading(type));
   try {
      const res = yield call(authService.getPermissionsService);
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put({
         type: GET_PERMISSIONS_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      if (err?.data?.message === "Internal server error") {
         yield put(httpRequestsOnErrorsActions.appendError(type, err?.data?.message));
      }
   }
}

function* deletePermission(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.deletePermission, action.payload);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchPermission = function* watchPermissionSaga() {
   yield takeLatest(CREATE_PERMISSION, createPermission);
   yield takeLatest(GET_PERMISSIONS, getPermissions);
   yield takeLatest(DELETE_PERMISSION, deletePermission);
};

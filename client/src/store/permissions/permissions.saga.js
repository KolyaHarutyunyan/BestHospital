import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./permissions.service";
import { CREATE_PERMISSION, DELETE_PERMISSION, GET_PERMISSIONS, GET_PERMISSIONS_SUCCESS,
} from "./permissions.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";

function* createPermission(action) {
  try {
    const res = yield call( authService.createPermissionService, action.payload.body );

  } catch (err) {
    console.log(err)
  }
}

function* getPermissions({action, type}) {
  yield put(httpRequestsOnErrorsActions.removeError(type));
  yield put(httpRequestsOnLoadActions.appendLoading(type));
  try {
    const res = yield call( authService.getPermissionsService );
    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnErrorsActions.removeError(type));
    yield put({
      type: GET_PERMISSIONS_SUCCESS,
      payload: res.data,
    });


  } catch (err) {

    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnErrorsActions.removeError(type));
    console.log(err)
  }
}

function* deletePermission(action) {
  try {
    const res = yield call( authService.deletePermission, action.payload );

  } catch (err) {
    console.log(err)
  }
}

export const watchPermission = function* watchPermissionSaga() {
  yield takeLatest( CREATE_PERMISSION, createPermission );
  yield takeLatest( GET_PERMISSIONS, getPermissions );
  yield takeLatest( DELETE_PERMISSION, deletePermission );
};

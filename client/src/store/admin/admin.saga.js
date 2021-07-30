import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./admin.service";
import {
  ACTIVATE_ADMIN,
  CREATE_ADMIN, GET_ADMIN_BY_ID, GET_ADMIN_BY_ID_SUCCESS, GET_ADMINS, GET_ADMINS_SUCCESS, INACTIVATE_ADMIN,

} from "./admin.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";

function* createAdmin(action) {
  try {
    const res = yield call( authService.createAdminService, action.payload.body );
    window.location.replace('/humanResources')
  } catch (err) {
    console.log(err)
  }
}

function* getAdmins({action, type}) {
  yield put(httpRequestsOnErrorsActions.removeError(type));
  yield put(httpRequestsOnLoadActions.appendLoading(type));
  try {
    const res = yield call( authService.getAdminsService);
    yield put({
      type: GET_ADMINS_SUCCESS,
      payload: res.data.reverse(),
    });
    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnErrorsActions.removeError(type));

  } catch (err) {
    yield put(httpRequestsOnLoadActions.removeLoading(type));
    yield put(httpRequestsOnErrorsActions.removeError(type));
    console.log(err)
  }
}

function* getAdminById(action) {
  try {
    const res = yield call( authService.getAdminByIdService, action.payload.adminId );
    yield put({
      type: GET_ADMIN_BY_ID_SUCCESS,
      payload: res.data,
    });

  } catch (err) {
    console.log(err)
  }
}
function* activateAdmin(action) {
  try {
    const res = yield call( authService.activateAdminService, action.payload );
  } catch (err) {
    console.log(err)
  }
}
function* inactivateAdmin(action) {
  try {
    const res = yield call( authService.inactivateAdminService, action.payload );
  } catch (err) {
    console.log(err)
  }
}

export const watchAdmin = function* watchAdminSaga() {
  yield takeLatest( CREATE_ADMIN, createAdmin );
  yield takeLatest( GET_ADMINS, getAdmins );
  // yield takeLatest( GET_ADMIN_BY_ID, getAdminById );

  yield takeLatest( ACTIVATE_ADMIN, activateAdmin );
  yield takeLatest( INACTIVATE_ADMIN, inactivateAdmin );

};

import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./role.service";
import {
   ADD_ROLE_PERMISSION,
   CREATE_ROLE,
   DELETE_ROLE,
   DELETE_ROLE_PERMISSION,
   GET_ROLE,
   GET_ROLE_BY_ID,
   GET_ROLE_BY_ID_SUCCESS,
   GET_ROLE_SUCCESS,
} from "./role.types";
import { roleActions } from "./index";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "../http_requests_on_success";

function* createRole(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.createRoleService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_ROLE,
         payload: { data: { limit: 10, skip: 0 } },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getRole(action) {
   // if(action?.payload?.load !== 'noLoad'){
      yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   // }
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(authService.getRoleService, action.payload?.data);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_ROLE_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put({
         type: GET_ROLE_SUCCESS,
         payload: { roles: [], count: 0 },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      if (err?.data?.message === "Internal server error") {
         yield put(
            httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message)
         );
      }
   }
}

function* deleteRole(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.deleteRoleService, action.payload.id);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      // yield put(roleActions.getRole());
      yield put({
         type: GET_ROLE,
         payload: { data: { limit: 10, skip: 0 }, load: 'noLoad'  },
      });

      // yield put({
      //    type: DELETE_ROLE_SUCCESS,
      //    payload: res.data,
      // });
   } catch (err) {
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   }
}

function* getRoleById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(authService.getRoleByIdService, action.payload.id);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_ROLE_BY_ID_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      if (err?.data?.message === "Internal server error") {
         yield put(
            httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message)
         );
      }
   }
}

function* addRolePermission(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.addRolePermissionService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put(roleActions.getRoleById(action.payload.body.roleId));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteRolePermission(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(authService.deleteRolePermissionService, action.payload.data);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put(roleActions.getRoleById(action.payload.data.roleId));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchRole = function* watchRoleSaga() {
   yield takeLatest(CREATE_ROLE, createRole);
   yield takeLatest(GET_ROLE, getRole);
   yield takeLatest(DELETE_ROLE, deleteRole);
   yield takeLatest(GET_ROLE_BY_ID, getRoleById);
   yield takeLatest(ADD_ROLE_PERMISSION, addRolePermission);
   yield takeLatest(DELETE_ROLE_PERMISSION, deleteRolePermission);
};
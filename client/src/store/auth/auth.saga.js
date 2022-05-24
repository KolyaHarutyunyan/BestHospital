import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./auth.service";
import {
   LOG_IN,
   LOG_IN_SUCCESS,
   LOG_OUT,
   GET_RECOVERY_LINK,
   RESET_PASSWORD_REQUEST,
   RESET_PASSWORD_SUCCESS,
   CHANGE_PASSWORD_REQUEST,
   GET_MY_AUTHN,
   GET_MY_PROFILE,
   GET_ACCESS,
   GET_ACCESS_SUCCESS,
   ASSIGN_ACCESS,
   REMOVE_ACCESS,
} from "./auth.types";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "../http_requests_on_success";

function* logIn({ payload, type }) {
   yield put(httpRequestsOnErrorsActions.removeError(type));
   yield put(httpRequestsOnLoadActions.appendLoading(type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(type));
   try {
      const res = yield call(authService.signIn, payload);
      localStorage.setItem("userType", res.data.userType);
      localStorage.setItem("access-token", res.data.token);
      window.location.replace("/");
      yield put({
         type: LOG_IN_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put(httpRequestsOnErrorsActions.removeError(type));
   } catch (err) {
      yield put(httpRequestsOnErrorsActions.appendError(type, err?.data?.message));
      yield put(httpRequestsOnLoadActions.removeLoading(type));
   }
}

function* logOut(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(authService.logOut);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      localStorage.removeItem("access-token");
      localStorage.removeItem("wellUserInfo");
      localStorage.removeItem("userType");
      window.location.replace("/login");
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
      if (err.response.data.statusCode === 401) {
         localStorage.removeItem("access-token");
         localStorage.removeItem("wellUserInfo");
         localStorage.removeItem("userType");
         window.location.replace("/login");
      }
   }
}

function* getLink({ payload, type }) {
   yield put(httpRequestsOnErrorsActions.removeError(type));
   yield put(httpRequestsOnLoadActions.appendLoading(type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(type));
   try {
      yield call(authService.getLink, payload.email);
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(type));
      yield put(httpRequestsOnErrorsActions.appendError(type, err?.data?.message));
      yield put(httpRequestsOnSuccessActions.removeSuccess(type));
   }
}

function* resetPassword(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      if (action.payload.passwords.type === "reset") {
         const res = yield call(authService.resetPass, action.payload.passwords);
         localStorage.setItem("access-token", res.data.token);
         localStorage.setItem("permissions", res.data.permissions);
         localStorage.setItem("userType", res.data.userType);
         window.location.replace("/");
      } else {
         const res = yield call(authService.confirmAccount, action.payload.passwords);
         localStorage.setItem("access-token", res.data.token);
         localStorage.setItem("permissions", res.data.permissions);
         localStorage.setItem("userType", res.data.userType);
         window.location.replace("/");
      }
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      localStorage.removeItem("Reset");
      yield put({
         type: RESET_PASSWORD_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
      yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   }
}

function* changePassword(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.changePasswordService, action.payload.data);
      localStorage.setItem("access-token", res.data.accessToken);
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.removeError(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getMuAuthn(action) {
   try {
      const res = yield call(authService.muAuthnService);
      // localStorage.setItem('poloUserInfo', JSON.stringify(res.data.email) );
      // localStorage.setItem('permissions', JSON.stringify(res.data.roles) );
   } catch (err) {}
}

function* getMuProfile(action) {
   try {
      const res = yield call(authService.myProfileService, action.payload.type);
      localStorage.setItem("wellUserInfo", JSON.stringify(res.data));
   } catch (err) {
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

/** Access service */
function* getAccessService(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(authService.getAccessService, action.payload.userId);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_ACCESS_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* assignAccess(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         authService.addAccessService,
         action.payload.userId,
         action.payload.roleId
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_ACCESS,
         payload: { userId: action.payload.userId },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* removeAccess(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         authService.removeAccessService,
         action.payload.userId,
         action.payload.roleId
      );
      yield put({
         type: GET_ACCESS,
         payload: { userId: action.payload.userId },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

/** End */

export const watchAuth = function* watchUserAuth() {
   yield takeLatest(LOG_IN, logIn);
   yield takeLatest(LOG_OUT, logOut);
   yield takeLatest(GET_MY_AUTHN, getMuAuthn);
   yield takeLatest(GET_MY_PROFILE, getMuProfile);
   yield takeLatest(GET_RECOVERY_LINK, getLink);
   yield takeLatest(RESET_PASSWORD_REQUEST, resetPassword);
   yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);

   /** Access service */
   yield takeLatest(GET_ACCESS, getAccessService);
   yield takeLatest(ASSIGN_ACCESS, assignAccess);
   yield takeLatest(REMOVE_ACCESS, removeAccess);
   /** End */
};

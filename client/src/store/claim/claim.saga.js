import { call, put, takeLatest } from "redux-saga/effects";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "../http_requests_on_success";
import { claimService } from "./claim.service";
import {
   EDIT_CLAIM_STATUS,
   GENERATE_CLAIM,
   GET_CLAIMS,
   GET_CLAIMS_SUCCESS,
   GET_CLAIM_BY_ID,
   GET_CLAIM_BY_ID_SUCCESS,
} from "./claim.type";

function* getClaims(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(claimService.getClaimsService);
      yield put({
         type: GET_CLAIMS_SUCCESS,
         payload: { claims: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put({
         type: GET_CLAIMS_SUCCESS,
         payload: { claims: [] },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* getClaimById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(claimService.getClaimByIdService, action.payload.id);
      yield put({
         type: GET_CLAIM_BY_ID_SUCCESS,
         payload: { claimById: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* generateClaim(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(claimService.generateClaimService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* editClaimStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(claimService.editClaimStatusService, action.payload.id, action.payload.status);
      yield put({
         type: GET_CLAIMS,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

export const watchClaim = function* watchClaimSaga() {
   yield takeLatest(GET_CLAIMS, getClaims);
   yield takeLatest(GET_CLAIM_BY_ID, getClaimById);
   yield takeLatest(GENERATE_CLAIM, generateClaim);
   yield takeLatest(EDIT_CLAIM_STATUS, editClaimStatus);
};

import { call, put, takeLatest } from "redux-saga/effects";
import {
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
   httpRequestsOnLoadActions,
} from "@eachbase/store";
import { claimService } from "./claim.service";
import {
   CLOSE_CLAIM,
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
      const res = yield call(claimService.getClaimsService, action?.payload?.data);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLAIMS_SUCCESS,
         payload: { claims: res.data },
      });
   } catch (err) {
      yield put({
         type: GET_CLAIMS_SUCCESS,
         payload: { claims: [] },
         // payload: { claims: { claims: [], count: 0 } },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      if (err?.data?.message === "Internal server error") {
         yield put(
            httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message)
         );
      }
   }
}

function* getClaimById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(claimService.getClaimByIdService, action.payload.id);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLAIM_BY_ID_SUCCESS,
         payload: { claimById: res.data },
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

function* generateClaim(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         claimService.generateClaimService,
         action.payload.group,
         action.payload.body
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      window.location.replace("/claims");
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* closeClaim(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         claimService.closeClaimService,
         action.payload.id,
         action.payload.details
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLAIM_BY_ID,
         payload: { id: action.payload.id },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchClaim = function* watchClaimSaga() {
   yield takeLatest(GET_CLAIMS, getClaims);
   yield takeLatest(GET_CLAIM_BY_ID, getClaimById);
   yield takeLatest(GENERATE_CLAIM, generateClaim);
   yield takeLatest(CLOSE_CLAIM, closeClaim);
};

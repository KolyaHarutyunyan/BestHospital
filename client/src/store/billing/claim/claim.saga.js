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
      yield call(
         claimService.generateClaimService,
         action.payload.group,
         action.payload.body
      );
      window.location.replace("/claims");
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* closeClaim(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         claimService.closeClaimService,
         action.payload.id,
         action.payload.details
      );
      window.location.replace(`/claim/${action.payload.id}`);
      // yield put({
      //    type: GET_CLAIM_BY_ID,
      // });                                 // esi xi chi ashxatum ?
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
   yield takeLatest(CLOSE_CLAIM, closeClaim);
};

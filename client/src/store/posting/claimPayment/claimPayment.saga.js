import { call, put, takeLatest } from "redux-saga/effects";
import {
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
   httpRequestsOnLoadActions,
} from "@eachbase/store";
import { claimPaymentService } from "./claimPayment.service";
import {
   ADD_CLAIM_IN_CLAIM_PAYMENT,
   CREATE_CLAIM_PAYMENT,
   DELETE_CLAIM_PAYMENT,
   EDIT_CLAIM_PAYMENT,
   EDIT_CLAIM_PAYMENT_STATUS,
   GET_CLAIM_PAYMENTS,
   GET_CLAIM_PAYMENTS_SUCCESS,
   GET_CLAIM_PAYMENT_BY_ID,
   GET_CLAIM_PAYMENT_BY_ID_SUCCESS,
} from "./claimPayment.type";

function* getClaimPayments(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         claimPaymentService.getClaimPaymentsService,
         action?.payload?.data
      );
      yield put({
         type: GET_CLAIM_PAYMENTS_SUCCESS,
         payload: { claimPayments: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put({
         type: GET_CLAIM_PAYMENTS_SUCCESS,
         payload: { claimPayments: { claimPmt: [], count: 0 } },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getClaimPaymentById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         claimPaymentService.getClaimPaymentByIdService,
         action.payload.id
      );
      yield put({
         type: GET_CLAIM_PAYMENT_BY_ID_SUCCESS,
         payload: { claimPaymentById: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createClaimPayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(claimPaymentService.createClaimPaymentService, action.payload.body);
      yield put({ type: GET_CLAIM_PAYMENTS });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editClaimPayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         claimPaymentService.editClaimPaymentService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_CLAIM_PAYMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteClaimPayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(claimPaymentService.deleteClaimPaymentService, action.payload.id);
      yield put({
         type: GET_CLAIM_PAYMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editClaimPaymentStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         claimPaymentService.editClaimPaymentStatusService,
         action.payload.id,
         action.payload.status,
         action.payload.details
      );
      yield put({
         type: GET_CLAIM_PAYMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* addClaimInClaimPayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         claimPaymentService.addClaimInClaimPaymentService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_CLAIM_PAYMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchClaimPayment = function* watchClaimPaymentSaga() {
   yield takeLatest(GET_CLAIM_PAYMENTS, getClaimPayments);
   yield takeLatest(GET_CLAIM_PAYMENT_BY_ID, getClaimPaymentById);
   yield takeLatest(CREATE_CLAIM_PAYMENT, createClaimPayment);
   yield takeLatest(EDIT_CLAIM_PAYMENT, editClaimPayment);
   yield takeLatest(DELETE_CLAIM_PAYMENT, deleteClaimPayment);
   yield takeLatest(EDIT_CLAIM_PAYMENT_STATUS, editClaimPaymentStatus);
   yield takeLatest(ADD_CLAIM_IN_CLAIM_PAYMENT, addClaimInClaimPayment);
};

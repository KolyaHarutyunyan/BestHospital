import { call, put, takeLatest } from "redux-saga/effects";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "../http_requests_on_success";
import { billingService } from "./billing.service";
import {
   ABORT_BILLLING_TRANSACTION,
   ADD_BILLLING_TRANSACTION,
   CREATE_BILLING,
   EDIT_BILLING_STATUS,
   GET_BILLINGS,
   GET_BILLINGS_SUCCESS,
   GET_BILLING_BY_ID,
   GET_BILLING_BY_ID_SUCCESS,
} from "./billing.type";

function* getBillings(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(billingService.getBillingsService);
      yield put({
         type: GET_BILLINGS_SUCCESS,
         payload: { billings: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put({
         type: GET_BILLINGS_SUCCESS,
         payload: { billings: [] },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* getBillingById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(billingService.getBillingByIdService, action.payload.id);
      yield put({
         type: GET_BILLING_BY_ID_SUCCESS,
         payload: { billingById: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* createBilling(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(billingService.createBillingService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* editBillingStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(billingService.editBillingStatusService, action.payload.id, action.payload.status);
      yield put({
         type: GET_BILLINGS,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* addBillingTransaction(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         billingService.addBillingTransactionService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_BILLINGS,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* abortBillingTransaction(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(billingService.addBillingTransactionService, action.payload.id);
      yield put({
         type: GET_BILLINGS,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

export const watchBilling = function* watchBillingSaga() {
   yield takeLatest(GET_BILLINGS, getBillings);
   yield takeLatest(GET_BILLING_BY_ID, getBillingById);
   yield takeLatest(CREATE_BILLING, createBilling);
   yield takeLatest(EDIT_BILLING_STATUS, editBillingStatus);
   yield takeLatest(ADD_BILLLING_TRANSACTION, addBillingTransaction);
   yield takeLatest(ABORT_BILLLING_TRANSACTION, abortBillingTransaction);
};

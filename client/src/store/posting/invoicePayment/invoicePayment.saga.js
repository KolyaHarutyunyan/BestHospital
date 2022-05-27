import { call, put, takeLatest } from "redux-saga/effects";
import {
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
   httpRequestsOnLoadActions,
} from "@eachbase/store";
import { invoicePaymentService } from "./invoicePayment.service";
import {
   ADD_INVOICE_IN_INVOICE_PAYMENT,
   CREATE_INVOICE_PAYMENT,
   DELETE_INVOICE_PAYMENT,
   EDIT_INVOICE_PAYMENT,
   EDIT_INVOICE_PAYMENT_STATUS,
   GET_INVOICE_PAYMENTS,
   GET_INVOICE_PAYMENTS_SUCCESS,
   GET_INVOICE_PAYMENT_BY_ID,
   GET_INVOICE_PAYMENT_BY_ID_SUCCESS,
} from "./invoicePayment.type";

function* getInvoicePayments(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         invoicePaymentService.getInvoicePaymentsService,
         action?.payload?.data
      );
      yield put({
         type: GET_INVOICE_PAYMENTS_SUCCESS,
         payload: { invoicePayments: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put({
         type: GET_INVOICE_PAYMENTS_SUCCESS,
         payload: { invoicePayments: { invPmt: [], count: 0 } },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getInvoicePaymentById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         invoicePaymentService.getInvoicePaymentByIdService,
         action.payload.id
      );
      yield put({
         type: GET_INVOICE_PAYMENT_BY_ID_SUCCESS,
         payload: { invoicePaymentById: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createInvoicePayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(invoicePaymentService.createInvoicePaymentService, action.payload.body);
      yield put({ type: GET_INVOICE_PAYMENTS });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editInvoicePayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         invoicePaymentService.editInvoicePaymentService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_INVOICE_PAYMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteInvoicePayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(invoicePaymentService.deleteInvoicePaymentService, action.payload.id);
      yield put({
         type: GET_INVOICE_PAYMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editInvoicePaymentStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         invoicePaymentService.editInvoicePaymentStatusService,
         action.payload.id,
         action.payload.status,
         action.payload.details
      );
      yield put({
         type: GET_INVOICE_PAYMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* addInvoiceInInvoicePayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         invoicePaymentService.addInvoiceInInvoicePaymentService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_INVOICE_PAYMENT_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchInvoicePayment = function* watchInvoicePaymentSaga() {
   yield takeLatest(GET_INVOICE_PAYMENTS, getInvoicePayments);
   yield takeLatest(GET_INVOICE_PAYMENT_BY_ID, getInvoicePaymentById);
   yield takeLatest(CREATE_INVOICE_PAYMENT, createInvoicePayment);
   yield takeLatest(EDIT_INVOICE_PAYMENT, editInvoicePayment);
   yield takeLatest(DELETE_INVOICE_PAYMENT, deleteInvoicePayment);
   yield takeLatest(EDIT_INVOICE_PAYMENT_STATUS, editInvoicePaymentStatus);
   yield takeLatest(ADD_INVOICE_IN_INVOICE_PAYMENT, addInvoiceInInvoicePayment);
};

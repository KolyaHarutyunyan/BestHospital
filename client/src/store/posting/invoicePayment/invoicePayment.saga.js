import { call, put, takeLatest } from "redux-saga/effects";
import {
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
   httpRequestsOnLoadActions,
} from "@eachbase/store";
import { invoicePaymentService } from "./invoicePayment.service";
import {
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
   try {
      const res = yield call(invoicePaymentService.getInvoicePaymentsService);
      yield put({
         type: GET_INVOICE_PAYMENTS_SUCCESS,
         payload: { invoicePayments: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put({
         type: GET_INVOICE_PAYMENTS_SUCCESS,
         payload: { invoicePayments: [] },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* getInvoicePaymentById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
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
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* createInvoicePayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(invoicePaymentService.createInvoicePaymentService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* editInvoicePayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         invoicePaymentService.editInvoicePaymentService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_INVOICE_PAYMENT_BY_ID,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* deleteInvoicePayment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(invoicePaymentService.deleteInvoicePaymentService, action.payload.id);
      yield put({
         type: GET_INVOICE_PAYMENT_BY_ID,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* editInvoicePaymentStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         invoicePaymentService.editInvoicePaymentStatusService,
         action.payload.id,
         action.payload.status,
         action.payload.details
      );
      yield put({
         type: GET_INVOICE_PAYMENT_BY_ID,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

export const watchInvoicePayment = function* watchInvoicePaymentSaga() {
   yield takeLatest(GET_INVOICE_PAYMENTS, getInvoicePayments);
   yield takeLatest(GET_INVOICE_PAYMENT_BY_ID, getInvoicePaymentById);
   yield takeLatest(CREATE_INVOICE_PAYMENT, createInvoicePayment);
   yield takeLatest(EDIT_INVOICE_PAYMENT, editInvoicePayment);
   yield takeLatest(DELETE_INVOICE_PAYMENT, deleteInvoicePayment);
   yield takeLatest(EDIT_INVOICE_PAYMENT_STATUS, editInvoicePaymentStatus);
};

import { call, put, takeLatest } from "redux-saga/effects";
import {
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
   httpRequestsOnLoadActions,
} from "@eachbase/store";
import { invoiceService } from "./invoice.service";
import {
   DELETE_INVOICE,
   EDIT_INVOICE,
   GENERATE_INVOICE,
   GET_INVOICES,
   GET_INVOICES_SUCCESS,
   GET_INVOICE_BY_ID,
   GET_INVOICE_BY_ID_SUCCESS,
} from "./invoice.type";

function* getInvoices(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(invoiceService.getInvoicesService, action?.payload?.data);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_INVOICES_SUCCESS,
         payload: { invoices: res.data },
      });
   } catch (err) {
      yield put({
         type: GET_INVOICES_SUCCESS,
         payload: { invoices: [] },
         // payload: { invoices: { invoices: [], count: 0 } },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getInvoiceById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(invoiceService.getInvoiceByIdService, action.payload.id);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_INVOICE_BY_ID_SUCCESS,
         payload: { invoiceById: res.data },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* generateInvoice(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(invoiceService.generateInvoiceService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      window.location.replace("/invoices");
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editInvoice(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         invoiceService.editInvoiceService,
         action.payload.id,
         action.payload.body
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_INVOICE_BY_ID,
         payload: { id: action.payload.id },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteInvoice(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(invoiceService.deleteInvoiceService, action.payload.id);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_INVOICE_BY_ID,
         payload: { id: action.payload.id },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchInvoice = function* watchInvoiceSaga() {
   yield takeLatest(GET_INVOICES, getInvoices);
   yield takeLatest(GET_INVOICE_BY_ID, getInvoiceById);
   yield takeLatest(GENERATE_INVOICE, generateInvoice);
   yield takeLatest(EDIT_INVOICE, editInvoice);
   yield takeLatest(DELETE_INVOICE, deleteInvoice);
};

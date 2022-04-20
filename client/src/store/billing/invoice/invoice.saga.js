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
      const res = yield call(invoiceService.getInvoicesService);
      yield put({
         type: GET_INVOICES_SUCCESS,
         payload: { invoices: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put({
         type: GET_INVOICES_SUCCESS,
         payload: { invoices: [] },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* getInvoiceById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(invoiceService.getInvoiceByIdService, action.payload.id);
      yield put({
         type: GET_INVOICE_BY_ID_SUCCESS,
         payload: { invoiceById: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* generateInvoice(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(invoiceService.generateInvoiceService, action.payload.body);
      window.location.replace("/invoices");
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* editInvoice(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         invoiceService.editInvoiceService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_INVOICE_BY_ID,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* deleteInvoice(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(invoiceService.deleteInvoiceService, action.payload.id);
      yield put({
         type: GET_INVOICE_BY_ID,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

export const watchInvoice = function* watchInvoiceSaga() {
   yield takeLatest(GET_INVOICES, getInvoices);
   yield takeLatest(GET_INVOICE_BY_ID, getInvoiceById);
   yield takeLatest(GENERATE_INVOICE, generateInvoice);
   yield takeLatest(EDIT_INVOICE, editInvoice);
   yield takeLatest(DELETE_INVOICE, deleteInvoice);
};

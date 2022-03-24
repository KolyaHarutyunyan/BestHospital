import { call, put, takeLatest } from "redux-saga/effects";
import {
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
   httpRequestsOnLoadActions,
} from "@eachbase/store";
import { billService } from "./bill.service";
import {
   ABORT_BILL_TRANSACTION,
   ADD_BILL_TRANSACTION,
   CREATE_BILL,
   EDIT_BILL_CLAIM_STATUS,
   EDIT_BILL_INVOICE_STATUS,
   EDIT_BILL_STATUS,
   GET_BILLS,
   GET_BILLS_SUCCESS,
   GET_BILL_BY_ID,
   GET_BILL_BY_ID_SUCCESS,
} from "./bill.type";

function* getBills(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         billService.getBillsService,
         action?.payload?.data
      );

      yield put({
         type: GET_BILLS_SUCCESS,
         payload: { bills: res.data },
      });

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put({
         type: GET_BILLS_SUCCESS,
         payload: { bills: { bills: [], count: 0 } },
      });

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* getBillById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         billService.getBillByIdService,
         action.payload.id,
         action.payload?.data
      );

      yield put({
         type: GET_BILL_BY_ID_SUCCESS,
         payload: { billById: res.data },
      });

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* createBill(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(billService.createBillService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* editBillStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         billService.editBillStatusService,
         action.payload.id,
         action.payload.status
      );

      yield put({
         type: GET_BILL_BY_ID,
         payload: { id: action.payload.id },
      });

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* editBillClaimStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         billService.editBillClaimStatusService,
         action.payload.id,
         action.payload.status
      );

      yield put({
         type: GET_BILL_BY_ID,
         payload: { id: action.payload.id },
      });

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* editBillInvoiceStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         billService.editBillInvoiceStatusService,
         action.payload.id,
         action.payload.status
      );

      yield put({
         type: GET_BILL_BY_ID,
         payload: { id: action.payload.id },
      });

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* addBillTransaction(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         billService.addBillTransactionService,
         action.payload.id,
         action.payload.body
      );

      yield put({
         type: GET_BILL_BY_ID,
         payload: { id: action.payload.id },
      });

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

function* abortBillTransaction(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         billService.abortBillTransactionService,
         action.payload.id,
         action.payload.tsxId
      );

      yield put({
         type: GET_BILL_BY_ID,
         payload: { id: action.payload.id },
      });

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (error) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type));
   }
}

export const watchBill = function* watchBillSaga() {
   yield takeLatest(GET_BILLS, getBills);
   yield takeLatest(GET_BILL_BY_ID, getBillById);
   yield takeLatest(CREATE_BILL, createBill);
   yield takeLatest(EDIT_BILL_STATUS, editBillStatus);
   yield takeLatest(EDIT_BILL_CLAIM_STATUS, editBillClaimStatus);
   yield takeLatest(EDIT_BILL_INVOICE_STATUS, editBillInvoiceStatus);
   yield takeLatest(ADD_BILL_TRANSACTION, addBillTransaction);
   yield takeLatest(ABORT_BILL_TRANSACTION, abortBillTransaction);
};

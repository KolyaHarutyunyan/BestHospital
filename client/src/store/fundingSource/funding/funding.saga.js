import { call, put, takeLatest } from "@redux-saga/core/effects";
import { fundingService } from "./funding.service";
import {
   CHANGE_FUNDING_SOURCE_STATUS,
   CREATE_FUNDING_SOURCE,
   DELETE_FUNDING_SOURCE,
   EDIT_FUNDING_SOURCE,
   GET_FUNDING_SOURCES,
   GET_FUNDING_SOURCE_BY_ID,
} from "./funding.type";

function* createFundingSource(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(fundingService.createFundingSourceService, action.payload.body);
      yield put({
         type: GET_FUNDING_SOURCES,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editFundingSource(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         fundingService.editFundingSourceService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_FUNDING_SOURCE_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingSources(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         fundingService.getFundingSourcesService,
         action?.payload?.data
      );
      yield put({
         type: GET_FUNDING_SOURCE_SUCCESS,
         payload: { fundingSources: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.removeError(action.type));
   } catch (err) {
      yield put({
         type: GET_FUNDING_SOURCE_SUCCESS,
         payload: { fundingSources: { fundingSources: [], count: 0 } },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingSourceById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         fundingService.getFundingSourceByIdService,
         action.payload.id
      );
      yield put({
         type: GET_FUNDING_SOURCE_BY_ID_SUCCESS,
         payload: { fundingSourceById: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteFundingSource(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(fundingService.deleteFundingSourceService, action.payload.id);
      yield put({
         type: GET_FUNDING_SOURCE_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* changeFundingSourceStatus(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         fundingService.changeFundingSourceStatusService,
         action.payload.id,
         action.payload.status,
         action.payload.reason
      );
      yield put({
         type: GET_FUNDING_SOURCE_BY_ID,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchFunding = function* watchFundingSaga() {
   yield takeLatest(CREATE_FUNDING_SOURCE, createFundingSource);
   yield takeLatest(EDIT_FUNDING_SOURCE, editFundingSource);
   yield takeLatest(GET_FUNDING_SOURCES, getFundingSources);
   yield takeLatest(GET_FUNDING_SOURCE_BY_ID, getFundingSourceById);
   yield takeLatest(DELETE_FUNDING_SOURCE, deleteFundingSource);
   yield takeLatest(CHANGE_FUNDING_SOURCE_STATUS, changeFundingSourceStatus);
};

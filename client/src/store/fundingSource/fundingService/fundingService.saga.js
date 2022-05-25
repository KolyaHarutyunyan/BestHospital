import { call, put, takeLatest } from "@redux-saga/core/effects";
import { fundingServiceService } from "./fundingService.service";
import {
   CREATE_FUNDING_SERVICE,
   EDIT_FUNDING_SERVICE,
   GET_FUNDING_SERVICES,
   GET_FUNDING_SERVICES_SUCCESS,
   GET_FUNDING_SERVICE_BY_ID,
   GET_FUNDING_SERVICE_BY_ID_SUCCESS,
} from "./fundingServiceService.type";

function* createFundingService(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         fundingServiceService.createFundingServiceService,
         action.payload.fundingId,
         action.payload.body
      );
      yield put({
         type: GET_FUNDING_SERVICES,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editFundingService(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         fundingServiceService.editFundingServiceService,
         action.payload.serviceId,
         action.payload.body
      );
      yield put({
         type: GET_FUNDING_SERVICE_BY_ID,
         payload: { serviceId: action.payload.serviceId },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingServices(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         fundingServiceService.getFundingServicesService,
         action.payload.fundingId
      );
      yield put({
         type: GET_FUNDING_SERVICES_SUCCESS,
         payload: { fundingServices: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.removeError(action.type));
   } catch (err) {
      yield put({
         type: GET_FUNDING_SERVICES_SUCCESS,
         payload: { fundingServices: [] },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingServiceById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         fundingServiceService.getFundingServiceByIdService,
         action.payload.serviceId
      );
      yield put({
         type: GET_FUNDING_SERVICE_BY_ID_SUCCESS,
         payload: { fundingServiceById: res.data },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchFundingService = function* watchFundingServiceSaga() {
   yield takeLatest(CREATE_FUNDING_SERVICE, createFundingService);
   yield takeLatest(EDIT_FUNDING_SERVICE, editFundingService);
   yield takeLatest(GET_FUNDING_SERVICES, getFundingServices);
   yield takeLatest(GET_FUNDING_SERVICE_BY_ID, getFundingServiceById);
};

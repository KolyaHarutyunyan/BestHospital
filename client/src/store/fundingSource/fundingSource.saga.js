import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./fundingSource.service";
import {
   CREATE_FUNDING_SOURCE,
   GET_FUNDING_SOURCE,
   GET_FUNDING_SOURCE_BY_ID,
   GET_FUNDING_SOURCE_BY_ID_SUCCESS,
   GET_FUNDING_SOURCE_SUCCESS,
   GET_FUNDING_SOURCE_SERVICE_BY_ID,
   GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
   CREATE_FUNDING_SOURCE_SERVICE_BY_ID,
   GET_FUNDING_SOURCE_HISTORIES_BY_ID,
   GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
   EDIT_FUNDING_SOURCE,
   EDIT_FUNDING_SOURCE_SERVICE,
   CREATE_FUNDING_MODIFIER,
   EDIT_FUNDING_MODIFIER,
   CHANGE_FUNDING_MODIFIER_STATUS,
   SET_STATUS,
   CHANGE_FUNDING_SOURCE_STATUS,
} from "./fundingSource.types";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "../http_requests_on_success";

function* createFundingSource(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.createFundingSourceService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_FUNDING_SOURCE,
         payload: { data: { status: "ACTIVE", start: 0, end: 10 } },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editFundingSource(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.editFundingSourceService,
         action.payload.id,
         action.payload.body
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_BY_ID,
         payload: action.payload.id,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingSource(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(authService.getFundingSourceService, action.payload.data);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      if (err?.data?.message === "Internal server error") {
         yield put(
            httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message)
         );
      }
   }
}

function* getFundingSourceById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(authService.getFoundingSourceByIdService, action.payload);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_BY_ID_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      if (err?.data?.message === "Internal server error") {
         yield put(
            httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message)
         );
      }
   }
}

function* getFundingSourceServicesById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(
         authService.getFoundingSourceServiceByIdService,
         action.payload
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      if (err?.data?.message === "Internal server error") {
         yield put(
            httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message)
         );
      }
   }
}

function* createFundingSourceServiceById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.createFoundingSourceServiceByIdService,
         action.payload.id,
         action.payload.body
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
         payload: action.payload.id,
      });
   } catch (err) {
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   }
}

function* editFundingSourceService(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         authService.editFoundingSourceServiceService,
         action.payload.id,
         action.payload.body
      );
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
         payload: res.data?.funderId,
      });
   } catch (err) {
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   }
}

function* getFundingSourceHistoriesById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         authService.getFundingSourceHistoriesByIdService,
         action.payload.onModal,
         action.payload.searchDate
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      if (!action.payload.searchDate) {
         yield put({
            type: GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
            payload: [],
         });
      }
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      if (err?.data?.message === "Internal server error") {
         yield put(
            httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message)
         );
      }
   }
}

function* changeFundingSourceStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const body = action.payload.body ? action.payload.body : "";
      const res = yield call(
         authService.changeFundingSourceStatusService,
         action.payload.id,
         action.payload.path,
         action.payload.status,
         body
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: action.payload.type,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createFundingModifier(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.createFundingModifierService,
         action.payload.fundingId,
         action.payload.body
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
         payload: action.payload.fundingId,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editFundingModifier(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.editFundingModifierService,
         action.payload.fundingId,
         action.payload.serviceId,
         action.payload.modifierId,
         action.payload.body
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
         payload: action.payload.fundingId,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* changeFundingModifierStatus(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.changeFundingModifierStatusService,
         action.payload.fundingId,
         action.payload.serviceId,
         action.payload.modifierId,
         action.payload.status
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
         payload: action.payload.fundingId,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* setStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         authService.setStatusService,
         action.payload.id,
         action.payload.status
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_FUNDING_SOURCE_BY_ID_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchFundingSource = function* watchFundingSourceSaga() {
   yield takeLatest(CREATE_FUNDING_SOURCE, createFundingSource);
   yield takeLatest(EDIT_FUNDING_SOURCE, editFundingSource);
   yield takeLatest(GET_FUNDING_SOURCE, getFundingSource);
   yield takeLatest(GET_FUNDING_SOURCE_BY_ID, getFundingSourceById);
   yield takeLatest(GET_FUNDING_SOURCE_SERVICE_BY_ID, getFundingSourceServicesById);
   yield takeLatest(CREATE_FUNDING_SOURCE_SERVICE_BY_ID, createFundingSourceServiceById);
   yield takeLatest(EDIT_FUNDING_SOURCE_SERVICE, editFundingSourceService);
   yield takeLatest(GET_FUNDING_SOURCE_HISTORIES_BY_ID, getFundingSourceHistoriesById);
   yield takeLatest(SET_STATUS, changeFundingSourceStatus);
   yield takeLatest(CREATE_FUNDING_MODIFIER, createFundingModifier);
   yield takeLatest(EDIT_FUNDING_MODIFIER, editFundingModifier);
   yield takeLatest(CHANGE_FUNDING_MODIFIER_STATUS, changeFundingModifierStatus);
   yield takeLatest(CHANGE_FUNDING_SOURCE_STATUS, setStatus);
};

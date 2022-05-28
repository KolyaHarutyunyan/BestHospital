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
   GET_FUNDING_SOURCE_SERV_BY_ID_SUCCESS,
   GET_FUNDING_SOURCE_SERV_BY_ID,
   CREATE_FUNDING_SOURCE_SERVICE_MODIFIER,
   EDIT_FUNDING_SOURCE,
   EDIT_FUNDING_SOURCE_SERVICE,
   GET_FUNDING_SOURCE_SERVICE_MODIFIERS,
   GET_FUNDING_SOURCE_SERVICE_MODIFIERS_SUCCESS,
   GET_FUNDING_SOURCE_SERVICE_MODIFIERS_ERR,
   EDIT_FUNDING_SOURCE_SERVICE_MODIFIER,
   GET_FUNDING_SOURCE_SERVICE_MODIFIERS_CLIENT,
   SET_STATUS,
   GET_FUNDING_SOURCE_SERVICE_BY_ID_NO_LOAD,
   CREATE_FUNDING_MODIFIER,
   EDIT_FUNDING_MODIFIER,
   DELETE_FUNDING_MODIFIER,
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
      yield put({
         type: GET_FUNDING_SOURCE,
         payload: { status: "ACTIVE", start: 0, end: 10 },
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
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.editFundingSourceService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_FUNDING_SOURCE_BY_ID,
         payload: action.payload.id,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingSource(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getFundingSourceService, action.payload);
      yield put({
         type: GET_FUNDING_SOURCE_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingSourceById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getFoundingSourceByIdService, action.payload);
      yield put({
         type: GET_FUNDING_SOURCE_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingSourceServicesById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         authService.getFoundingSourceServiceByIdService,
         action.payload
      );
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingSourceServicesByIdNoLoad(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         authService.getFoundingSourceServiceByIdService,
         action.payload
      );
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFoundingSourceServById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         authService.getFoundingSourceServByIdService,
         action.payload.id
      );
      yield put({
         type: GET_FUNDING_SOURCE_SERV_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
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
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
         payload: action.payload.id,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
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
      yield call(
         authService.editFoundingSourceServiceService,
         action.payload.id,
         action.payload.body
      );
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   }
}

function* createFundingSourceServicesModifier(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.createFoundingSourceServiceModifierService,
         action.payload.body
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editFundingSourceServicesModifier(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.editFoundingSourceServiceModifierService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
         payload: action.payload.fsId,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingSourceServicesModifier(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      // const res = yield call(authService.getFoundingSourceServiceModifierService, action.payload);
      // yield put({
      //     type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_SUCCESS,
      //     payload: res.data,
      // });
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_ERR,
         payload: err,
      });
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_SUCCESS,
         payload: [],
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingSourceServicesModifierClient(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      // const res = yield call(authService.getFoundingSourceServiceModifierService, action.payload);
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_ERR,
         payload: error,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getFundingSourceHistoriesById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         authService.getFundingSourceHistoriesByIdService,
         action.payload.onModal,
         action.payload.searchDate
      );
      yield put({
         type: GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      if (!action.payload.searchDate) {
         yield put({
            type: GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
            payload: [],
         });
      }
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* setStatus(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const body = action.payload.body ? action.payload.body : "";
      const res = yield call(
         authService.setStatusService,
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
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
         payload: action.payload.fundingId,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
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
         action.payload.body
      );
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
         payload: action.payload.fundingId,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteFundingModifier(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.deleteFundingModifierService,
         action.payload.fundingId,
         action.payload.serviceId,
         action.payload.modifiersIds
      );
      yield put({
         type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
         payload: action.payload.fundingId,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
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
   yield takeLatest(
      GET_FUNDING_SOURCE_SERVICE_BY_ID_NO_LOAD,
      getFundingSourceServicesByIdNoLoad
   );
   yield takeLatest(CREATE_FUNDING_SOURCE_SERVICE_BY_ID, createFundingSourceServiceById);
   yield takeLatest(EDIT_FUNDING_SOURCE_SERVICE, editFundingSourceService);
   yield takeLatest(
      CREATE_FUNDING_SOURCE_SERVICE_MODIFIER,
      createFundingSourceServicesModifier
   );
   yield takeLatest(
      GET_FUNDING_SOURCE_SERVICE_MODIFIERS,
      getFundingSourceServicesModifier
   );
   yield takeLatest(GET_FUNDING_SOURCE_HISTORIES_BY_ID, getFundingSourceHistoriesById);
   // yield takeLatest(GET_FUNDING_SOURCE_SERV, getFundingSourceServ);
   // yield takeLatest(EDIT_ACTIVE_OR_INACTIVE, editActiveOrInactive);
   yield takeLatest(
      EDIT_FUNDING_SOURCE_SERVICE_MODIFIER,
      editFundingSourceServicesModifier
   );
   yield takeLatest(
      GET_FUNDING_SOURCE_SERVICE_MODIFIERS_CLIENT,
      getFundingSourceServicesModifierClient
   );
   yield takeLatest(SET_STATUS, setStatus);
   yield takeLatest(GET_FUNDING_SOURCE_SERV_BY_ID, getFoundingSourceServById);
   yield takeLatest(CREATE_FUNDING_MODIFIER, createFundingModifier);
   yield takeLatest(EDIT_FUNDING_MODIFIER, editFundingModifier);
   yield takeLatest(DELETE_FUNDING_MODIFIER, deleteFundingModifier);
};

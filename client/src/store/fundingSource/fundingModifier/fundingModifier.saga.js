import { call, put, takeLatest } from "@redux-saga/core/effects";
import { fundingModifierService } from "./fundingModifier.service";
import {
   CREATE_FUNDING_MODIFIER,
   DELETE_FUNDING_MODIFIER,
   EDIT_FUNDING_MODIFIER,
} from "./fundingModifier.type";

function* createFundingModifier(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(
         fundingModifierService.createFundingModifierService,
         action.payload.fundingId,
         action.payload.body
      );
      // yield put({
      //   call services here..
      // });
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
   try {
      yield call(
         fundingModifierService.editFundingModifierService,
         action.payload.fundingId,
         action.payload.serviceId,
         action.payload.body
      );
      // yield put({
      //   call services here..
      // });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteFundingModifier(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(fundingModifierService.deleteFundingModifierService, action.payload.id);
      // yield put({
      //   call services here..
      // });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchFundingModifier = function* watchFundingModifierSaga() {
   yield takeLatest(CREATE_FUNDING_MODIFIER, createFundingModifier);
   yield takeLatest(EDIT_FUNDING_MODIFIER, editFundingModifier);
   yield takeLatest(DELETE_FUNDING_MODIFIER, deleteFundingModifier);
};

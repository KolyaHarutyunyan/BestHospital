import { call, put, takeLatest } from "redux-saga/effects";
import { httpRequestsOnErrorsActions, httpRequestsOnLoadActions } from "..";
import { historyService } from "./history.service";
import { GET_HISTORY, GET_HISTORY_SUCCESS } from "./history.type";

function* getHistory(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         historyService.getHistoryService,
         action.payload.onModel,
         action.payload.queryParams
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_HISTORY_SUCCESS,
         payload: { history: res.data },
      });
   } catch (err) {
      yield put({
         type: GET_HISTORY_SUCCESS,
         payload: { history: [] },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      if (err?.data?.message === "Internal server error") {
         yield put(
            httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message)
         );
      }
   }
}

export const watchHistory = function* watchHistorySaga() {
   yield takeLatest(GET_HISTORY, getHistory);
};

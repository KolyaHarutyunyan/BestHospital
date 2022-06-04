import { call, put, takeLatest } from "redux-saga/effects";
import {
   httpRequestsOnErrorsActions,
   httpRequestsOnLoadActions,
   httpRequestsOnSuccessActions,
} from "..";
import { authService } from "./agent.service";
import {
   CREATE_AGENT,
   GET_AGENT_BY_ID,
   GET_AGENT_BY_ID_SUCCESS,
   GET_AGENTS,
   GET_AGENTS_SUCCESS,
} from "./agent.types";

function* createAgent(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.createAgentService, action.payload.body);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({ type: GET_AGENTS });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getAgents(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(authService.getAgentsService, action.payload);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_AGENTS_SUCCESS,
         payload: res.data.reverse(),
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getAgentById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(authService.getAgentByIdService, action.payload);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_AGENT_BY_ID_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchAgent = function* watchAgentSaga() {
   yield takeLatest(CREATE_AGENT, createAgent);
   yield takeLatest(GET_AGENTS, getAgents);
   yield takeLatest(GET_AGENT_BY_ID, getAgentById);
};
